import * as luadata from 'luadata';
import { EventType, JCL } from "../typed";
import { LRUCache } from 'lru-cache';
import { UnsupportEventTypeError } from '../errors';


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
        aTalent: luaData.length >= 7
          ? luaData[6].map(
            //@ts-ignore
            value => ({
              seq: value[0],
              skillId: value[1],
              level: value[2],
            })
          ) : null,
        szGUID: luaData.length >= 8 ? luaData[7] : null,
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

export type parserFnType = <T>(eventType: EventType) => Array<JCL.Line<T>>

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
