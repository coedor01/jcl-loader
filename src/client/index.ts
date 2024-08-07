import * as luadata from 'luadata';
import { EventType, LuaDataType, JCL, Game } from "./typed";
import { LRUCache } from 'lru-cache';
import { UnsupportEventTypeError } from './errors';
import { getTalentsMap, getXFsMap } from "jx3box-api-sdk/dist/esm";
import { XinFa } from 'jx3box-api-sdk/dist/esm/xf/typed';
import { Talent } from 'jx3box-api-sdk/dist/esm/skill/typed';


function loadRawLine(raw_line: string): JCL.RawLine {
  const [
    crc,
    frame,
    ts,
    delay,
    eventType,
    luadataStr,
  ] = raw_line.split("\t");
  const rawLine: JCL.RawLine = {
    crc: Number(crc),
    frame: Number(frame),
    ts: Number(ts),
    delay: Number(delay),
    eventType: Number(eventType),
    luadataStr: luadataStr,
  };
  return rawLine;
};

export function loadRaw(raw: string): Array<JCL.RawLine> {
  const rawTextLines: Array<string> = raw.split("\n");

  const result: Array<JCL.RawLine> = [];
  for (const rawTextLine of rawTextLines) {
    const rawLine: JCL.RawLine = loadRawLine(rawTextLine);
    result.push(rawLine);
  }
  return result;
};

function parseLuadata(eventType: EventType, luadataStr: string) {

  const luaData: any = luadata.serializer.unserialize(
    luadataStr,
    { dictType: "object" },
  );

  let data = {};
  switch (eventType) {
    case EventType.FightTime:
      data = {
        bFighting: luaData[0],
        szUUID: luaData[1],
        nDuring: luaData[2],
        dwMapID: luaData[3],
      };
      break;
    case EventType.PlayerEnterScene:
      data = {
        dwID: luaData[0],
      };
      break;
    case EventType.PlayerLeavecene:
      data = {
        dwID: luaData[0],
      };
      break;
    case EventType.PlayerInfo:
      data = {
        dwID: luaData[0],
        szName: luaData[1],
        dwForceID: luaData[2],
        dwMountKungfuID: luaData[3],
        nEquipScore: luaData[4],
        aEquip: luaData[5],
        aTalent: luaData[6].map(
          //@ts-ignore
          value => ({
            seq: value[0],
            skillId: value[1],
            level: value[2],
          })
        ),
        szGUID: luaData[7],
        _: luaData.length >= 9 ? luaData[8] : null,
      };
      break;
    case EventType.PlayerFightHint:
      data = {
        dwID: luaData[0],
        bFight: luaData[1],
        fCurrentLife: luaData[2],
        fMaxLife: luaData[3],
        nCurrentMana: luaData[4],
        nMaxMana: luaData[5],
      };
      break;
    case EventType.NpcEnterScene:
      data = {
        dwID: luaData[0],
      };
      break;
    case EventType.NpcLeavecene:
      data = {
        dwID: luaData[0],
      };
      break;
    case EventType.NpcFightHint:
      data = {
        dwID: luaData[0],
        bFight: luaData[1],
        fCurrentLife: luaData[2],
        fMaxLife: luaData[3],
        nCurrentMana: luaData[4],
        nMaxMana: luaData[5],
      };
      break;
    case EventType.DoodadEnterScene:
      data = {
        dwID: luaData[0],
      };
      break;
    case EventType.DoodadLeaveScene:
      data = {
        dwID: luaData[0],
      };
      break;
    case EventType.BuffUpdate:
      data = {
        dwPlayerID: luaData[0],
        bDelete: luaData[1],
        nIndex: luaData[2],
        bCanCancel: luaData[3],
        dwBuffID: luaData[4],
        nStackNum: luaData[5],
        nEndFrame: luaData[6],
        bInit: luaData[7],
        nLevel: luaData[8],
        dwSkillSrcID: luaData[9],
        bIsValid: luaData[10],
      };
      break;
    case EventType.OnWarningMessage:
      data = {
        szWarningType: luaData[0],
        szText: luaData[1],
      };
      break;
    case EventType.MsgSys:
      data = {
        szText: luaData[0],
        szChannel: luaData[1],
      };
      break;
    case EventType.SysMsgUiOmeSkillCastLog:
      data = {
        dwCaster: luaData[0],
        dwSkillID: luaData[1],
        dwLevel: luaData[2],
      };
      break;
    case EventType.SysMsgUiOmeSkillCastRespondLog:
      data = {
        dwCaster: luaData[0],
        dwSkillID: luaData[1],
        dwLevel: luaData[2],
        nRespond: luaData[3],
      };
      break;
    case EventType.SysMsgUiOmeSkillEffectLog:
      data = {
        dwCaster: luaData[0],
        dwTarget: luaData[1],
        bReact: luaData[2],
        nType: luaData[3],
        dwID: luaData[4],
        dwLevel: luaData[5],
        bCriticalStrike: luaData[6],
        nCount: luaData[7],
        tResultCount: luaData[8],
      };
      break;
    case EventType.SysMsgUiOmeSkillBlockLog:
      data = {
        dwCaster: luaData[0],
        dwTarget: luaData[1],
        nType: luaData[2],
        dwID: luaData[3],
        dwLevel: luaData[4],
        nDamageType: luaData[5],
      };
      break;
    case EventType.SysMsgUiOmeSkillShieldLog:
      data = {
        dwCaster: luaData[0],
        dwTarget: luaData[1],
        nType: luaData[2],
        dwID: luaData[3],
        dwLevel: luaData[4],
      };
      break;
    case EventType.SysMsgUiOmeSkillMissLog:
      data = {
        dwCaster: luaData[0],
        dwTarget: luaData[1],
        nType: luaData[2],
        dwID: luaData[3],
        dwLevel: luaData[4],
      };
      break;
    case EventType.SysMsgUiOmeSkillHitLog:
      data = {
        dwCaster: luaData[0],
        dwTarget: luaData[1],
        nType: luaData[2],
        dwID: luaData[3],
        dwLevel: luaData[4],
      };
      break;
    case EventType.SysMsgUiOmeSkillDodgeLog:
      data = {
        dwCaster: luaData[0],
        dwTarget: luaData[1],
        nType: luaData[2],
        dwID: luaData[3],
        dwLevel: luaData[4],
      };
      break;
    case EventType.SysMsgUiOmeCommonHealthLog:
      data = {
        dwCharacterID: luaData[0],
        nDeltaLife: luaData[1],
      };
      break;
    case EventType.SysMsgUiOmeDeathNotify:
      data = {
        dwCharacterID: luaData[0],
        dwKiller: luaData[1],
      };
      break;
    default:
      throw new UnsupportEventTypeError(eventType);
  }
  return data;
}


type parserFnType = <T>(eventType: EventType) => Array<JCL.Line<T>>

export function createParser(rawLines: Array<JCL.RawLine>): parserFnType {
  const _rawLines = rawLines;

  function filter<T>(eventType: EventType): Array<JCL.Line<T>> {
    //@ts-ignore
    const filteredLines: Array<Line<T>> = _rawLines
      .filter(rawLine => rawLine.eventType === eventType)
      .map(
        rawLine => {
          const {
            crc,
            frame,
            ts,
            delay,
            eventType,
            luadataStr,
          } = rawLine;

          return {
            crc,
            frame,
            ts,
            delay,
            eventType,
            luadata: parseLuadata(eventType, luadataStr),
          }
        }
      );

    return filteredLines;
  }
  return filter;
}

export function createParserWithLruCache(rawLines: Array<JCL.RawLine>, max: number): parserFnType {
  const _cache: LRUCache<EventType, any> = new LRUCache({ max });
  const filter = createParser(rawLines);

  function filterWithLruCache<T>(eventType: EventType): Array<JCL.Line<T>> {

    if (_cache.has(eventType)) {
      const value: Array<JCL.Line<T>> = _cache.get(eventType);
      _cache.delete(eventType);
      _cache.set(eventType, value);
      return value;
    }

    const value: Array<JCL.Line<T>> = filter<T>(eventType);
    _cache.set(eventType, value);

    return value;
  }

  return filterWithLruCache;
}


export async function getGameBasePlayers(parser: parserFnType): Promise<Array<Game.BasePlayer>> {
  const aPlayInfoLine: Array<JCL.Line<LuaDataType.PlayerInfo>> = parser(EventType.PlayerInfo);
  const faPlayInfoLine: Array<JCL.Line<LuaDataType.PlayerInfo>> = aPlayInfoLine
    .filter((item) => (item.luadata._ !== null));
  console.log(faPlayInfoLine[0].luadata.aTalent);

  const xfids: Set<number> = new Set();
  const skillIds: Set<number> = new Set();
  for (let item of faPlayInfoLine) {
    xfids.add(item.luadata.dwMountKungfuID);
    for (let talent of item.luadata.aTalent) {
      skillIds.add(talent.skillId);
    }
  }
  const xfsMap: Map<number, XinFa> = getXFsMap(Array.from(xfids));
  const skillsMap: Map<number, Talent> = await getTalentsMap(Array.from(skillIds));

  //@ts-ignore
  const aBasePlayer: Array<Game.BasePlayer> = (
    faPlayInfoLine
      .map(
        (item) => (
          {
            "id": item.luadata.szGUID,
            "name": item.luadata.szName,
            "xf": xfsMap.get(item.luadata.dwMountKungfuID),
            "nEquipScore": item.luadata.nEquipScore,
            "aTalent": item.luadata.aTalent.map(
              value => (skillsMap.get(value.skillId))
            )
          }
        )
      )
  );

  return aBasePlayer;
}