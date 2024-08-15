import { loadRaw, parserFnType, createParserWithLruCache, createParser } from "./core";
import { JCL, EventType, LuaDataType } from "./typed";

class Parser {
  readonly parser: parserFnType;

  constructor(parser: parserFnType) {
    this.parser = parser
  }

  static fromText(data: string, use_cache: boolean = true): Parser {
    const rawLines: Array<JCL.RawLine> = loadRaw(data);
    const enumCount = Object.keys(EventType).filter(key => isNaN(Number(key))).length;
    let parser: parserFnType;
    if (use_cache) {
      parser = createParserWithLruCache(rawLines, enumCount);
    } else {
      parser = createParser(rawLines)
    }
    return new Parser(parser);
  }

  getPlayerEnterScene(): Array<
    JCL.Line<LuaDataType.PlayerEnterScene>
  > {
    const result: Array<
      JCL.Line<LuaDataType.PlayerEnterScene>
    > = this.parser(EventType.PlayerEnterScene);
    return result;
  }

  getPlayerLeavecene(): Array<
    JCL.Line<LuaDataType.PlayerLeavecene>
  > {
    const result: Array<
      JCL.Line<LuaDataType.PlayerLeavecene>
    > = this.parser(EventType.PlayerLeavecene);
    return result;
  }

  getPlayerInfo(): Array<
    JCL.Line<LuaDataType.PlayerInfo>
  > {
    const result: Array<
      JCL.Line<LuaDataType.PlayerInfo>
    > = this.parser(EventType.PlayerInfo);
    return result;
  }

  getPlayerFightHint(): Array<
    JCL.Line<LuaDataType.PlayerFightHint>
  > {
    const result: Array<
      JCL.Line<LuaDataType.PlayerFightHint>
    > = this.parser(EventType.PlayerFightHint);
    return result;
  }

  getNpcEnterScene(): Array<
    JCL.Line<LuaDataType.NpcEnterScene>
  > {
    const result: Array<
      JCL.Line<LuaDataType.NpcEnterScene>
    > = this.parser(EventType.NpcEnterScene);
    return result;
  }

  getNpcLeavecene(): Array<
    JCL.Line<LuaDataType.NpcLeavecene>
  > {
    const result: Array<
      JCL.Line<LuaDataType.NpcLeavecene>
    > = this.parser(EventType.NpcLeavecene);
    return result;
  }

  getNpcFightHint(): Array<
    JCL.Line<LuaDataType.NpcFightHint>
  > {
    const result: Array<
      JCL.Line<LuaDataType.NpcFightHint>
    > = this.parser(EventType.NpcFightHint);
    return result;
  }

  getDoodadEnterScene(): Array<
    JCL.Line<LuaDataType.DoodadEnterScene>
  > {
    const result: Array<
      JCL.Line<LuaDataType.DoodadEnterScene>
    > = this.parser(EventType.DoodadEnterScene);
    return result;
  }

  getDoodadLeaveScene(): Array<
    JCL.Line<LuaDataType.DoodadLeaveScene>
  > {
    const result: Array<
      JCL.Line<LuaDataType.DoodadLeaveScene>
    > = this.parser(EventType.DoodadLeaveScene);
    return result;
  }

  getBuffUpdate(): Array<
    JCL.Line<LuaDataType.BuffUpdate>
  > {
    const result: Array<
      JCL.Line<LuaDataType.BuffUpdate>
    > = this.parser(EventType.BuffUpdate);
    return result;
  }

  getOnWarningMessage(): Array<
    JCL.Line<LuaDataType.OnWarningMessage>
  > {
    const result: Array<
      JCL.Line<LuaDataType.OnWarningMessage>
    > = this.parser(EventType.OnWarningMessage);
    return result;
  }

  getMsgSys(): Array<
    JCL.Line<LuaDataType.MsgSys>
  > {
    const result: Array<
      JCL.Line<LuaDataType.MsgSys>
    > = this.parser(EventType.MsgSys);
    return result;
  }

  getSysMsgUiOmeSkillCastLog(): Array<
    JCL.Line<LuaDataType.SysMsgUiOmeSkillCastLog>
  > {
    const result: Array<
      JCL.Line<LuaDataType.SysMsgUiOmeSkillCastLog>
    > = this.parser(EventType.SysMsgUiOmeSkillCastLog);
    return result;
  }

  getSysMsgUiOmeSkillCastRespondLog(): Array<
    JCL.Line<LuaDataType.SysMsgUiOmeSkillCastRespondLog>
  > {
    const result: Array<
      JCL.Line<LuaDataType.SysMsgUiOmeSkillCastRespondLog>
    > = this.parser(EventType.SysMsgUiOmeSkillCastRespondLog);
    return result;
  }

  getSysMsgUiOmeSkillEffectLog(): Array<
    JCL.Line<LuaDataType.SysMsgUiOmeSkillEffectLog>
  > {
    const result: Array<
      JCL.Line<LuaDataType.SysMsgUiOmeSkillEffectLog>
    > = this.parser(EventType.SysMsgUiOmeSkillEffectLog);
    return result;
  }

  getSysMsgUiOmeSkillBlockLog(): Array<
    JCL.Line<LuaDataType.SysMsgUiOmeSkillBlockLog>
  > {
    const result: Array<
      JCL.Line<LuaDataType.SysMsgUiOmeSkillBlockLog>
    > = this.parser(EventType.SysMsgUiOmeSkillBlockLog);
    return result;
  }

  getSysMsgUiOmeSkillShieldLog(): Array<
    JCL.Line<LuaDataType.SysMsgUiOmeSkillShieldLog>
  > {
    const result: Array<
      JCL.Line<LuaDataType.SysMsgUiOmeSkillShieldLog>
    > = this.parser(EventType.SysMsgUiOmeSkillShieldLog);
    return result;
  }

  getSysMsgUiOmeSkillMissLog(): Array<
    JCL.Line<LuaDataType.SysMsgUiOmeSkillMissLog>
  > {
    const result: Array<
      JCL.Line<LuaDataType.SysMsgUiOmeSkillMissLog>
    > = this.parser(EventType.SysMsgUiOmeSkillMissLog);
    return result;
  }

  getSysMsgUiOmeSkillHitLog(): Array<
    JCL.Line<LuaDataType.SysMsgUiOmeSkillHitLog>
  > {
    const result: Array<
      JCL.Line<LuaDataType.SysMsgUiOmeSkillHitLog>
    > = this.parser(EventType.SysMsgUiOmeSkillHitLog);
    return result;
  }

  getSysMsgUiOmeSkillDodgeLog(): Array<
    JCL.Line<LuaDataType.SysMsgUiOmeSkillDodgeLog>
  > {
    const result: Array<
      JCL.Line<LuaDataType.SysMsgUiOmeSkillDodgeLog>
    > = this.parser(EventType.SysMsgUiOmeSkillDodgeLog);
    return result;
  }

  getSysMsgUiOmeCommonHealthLog(): Array<
    JCL.Line<LuaDataType.SysMsgUiOmeCommonHealthLog>
  > {
    const result: Array<
      JCL.Line<LuaDataType.SysMsgUiOmeCommonHealthLog>
    > = this.parser(EventType.SysMsgUiOmeCommonHealthLog);
    return result;
  }

  getSysMsgUiOmeDeathNotify(): Array<
    JCL.Line<LuaDataType.SysMsgUiOmeDeathNotify>
  > {
    const result: Array<
      JCL.Line<LuaDataType.SysMsgUiOmeDeathNotify>
    > = this.parser(EventType.SysMsgUiOmeDeathNotify);
    return result;
  }

}

export default Parser;