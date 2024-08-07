import { Talent } from "jx3box-api-sdk/dist/esm/skill/typed";
import { XinFa } from "jx3box-api-sdk/dist/esm/xf/typed";

export namespace JCL {
  /**
  * Params:
  * @crc       crc校验码（已废弃）
  * @frame     事件发生的游戏帧数 (过图时可能为0) 
  * @ts        unix时间戳
  * @delay     客户端从启动开始计算的毫秒数
  * @eventType 事件类型枚举
  * @luaTable  Lua事件
  */
  export interface RawLine {
    crc: number,
    frame: number,
    ts: number,
    delay: number,
    eventType: number,
    luadataStr: string,
  };

  export interface Line<T> {
    crc: number,
    frame: number,
    ts: number,
    delay: number,
    eventType: number,
    luadata: T,
  };
}


export enum EventType {
  FightTime = 1,
  PlayerEnterScene = 2,
  PlayerLeavecene = 3,
  PlayerInfo = 4,
  PlayerFightHint = 5,
  NpcEnterScene = 6,
  NpcLeavecene = 7,
  // NpcInfo = 8,
  NpcFightHint = 9,
  DoodadEnterScene = 10,
  DoodadLeaveScene = 11,
  // DoodadInfo = 12,
  BuffUpdate = 13,
  // PlayerSay = 14,
  OnWarningMessage = 15,
  // PartyAddMember = 16,
  // PartySetMemberOnlineFlag = 17,
  MsgSys = 18,
  SysMsgUiOmeSkillCastLog = 19,
  SysMsgUiOmeSkillCastRespondLog = 20,
  SysMsgUiOmeSkillEffectLog = 21,
  SysMsgUiOmeSkillBlockLog = 22,
  SysMsgUiOmeSkillShieldLog = 23,
  SysMsgUiOmeSkillMissLog = 24,
  SysMsgUiOmeSkillHitLog = 25,
  SysMsgUiOmeSkillDodgeLog = 26,
  SysMsgUiOmeCommonHealthLog = 27,
  SysMsgUiOmeDeathNotify = 28,
  // TargetLocation = 29,
};


export namespace LuaDataType {
  /**
   * EventType: 1
   * EventName: 战斗时间
   * Params:
   * @bFighting 战斗开始还是结束
   * @szUUID    Jcl记录者的角色信息
   * @nDuring   战斗持续时间
   * @dwMapID   战斗所在的地图ID
  */
  export interface FightTime {
    bFighting: number,
    szUUID: number,
    nDuring: number,
    dwMapID: number,
  };


  /**
   * EventType: 2
   * EventName: 玩家进入场景
   * Params:
   * @dwID      玩家ID
   */
  export interface PlayerEnterScene {
    dwID: number,
  };


  /**
   * EventType: 3
   * EventName: 玩家离开场景
   * Params:
   * @dwID      玩家ID
   */
  export interface PlayerLeavecene {
    dwID: number,
  };

  /**
   * Name:      奇穴
   * Params:
   * @seq       处于同层的第几个
   * @skillId   奇穴对应的技能ID
   * @level     ?推测为技能等级，基本都是1
   */
  export interface rawTalent {
    seq: number,
    skillId: number,
    level: number,
  }

  /**
   * EventType:       4
   * EventName:       玩家信息数据
   * Params:
   * @dwID            玩家ID
   * @szName          玩家名称
   * @dwForceID       玩家门派势力ID
   * @dwMountKungfuID 玩家心法ID
   * @nEquipScore     玩家装分
   * @aEquip          玩家装备列表
   * @aTalent         玩家奇穴列表
   * @szGUID          玩家GUID
   * @_               未知
   */
  export interface PlayerInfo {
    dwID: number,
    szName: string,
    dwForceID: number,
    dwMountKungfuID: number,
    nEquipScore: number,
    aEquip: object,
    aTalent: Array<rawTalent>,
    szGUID: number,
    _: object | null,
  };


  /**
   * EventType:     5
   * EventName:     玩家战斗状态改变
   * Params:
   * @dwID          玩家ID  
   * @bFight        是否战斗中
   * @fCurrentLife  当前生命值
   * @fMaxLife      最大生命值
   * @nCurrentMana  当前蓝量
   * @nMaxMana      最大蓝量
   */
  export interface PlayerFightHint {
    dwID: number,
    bFight: boolean,
    fCurrentLife: number,
    fMaxLife: number,
    nCurrentMana: number,
    nMaxMana: number,
  };


  /**
   * EventType: 6
   * EventName: NPC 进入场景
   * Params:
   * @dwID      NPC实体ID
   */
  export interface NpcEnterScene {
    dwID: number,
  };


  /**
   * EventType: 7
   * EventName: NPC 离开场景
   * Params:
   * @dwID      NPC实体ID
   */
  export interface NpcLeavecene {
    dwID: number,
  };


  /**
   * EventType:     8
   * EventName:     NPC 信息数据
   * Notes:         真实数据有8个字段，比文档多了1个
   * Params:
   * @dwID          NPC ID
   * @szName        NPC名称
   * @dwTemplateID  模板ID
   * @dwEmployer    NPC所属的玩家ID
   * @nX            NPC的 X 坐标
   * @nY            NPC的 Y 坐标
   * @nZ            NPC的 Z 坐标
   */
  // export interface NpcInfo {
  //   dwID: number,
  //   szName: string,
  //   dwTemplateID: number,
  //   dwEmployer: number,
  //   nX: number,
  //   nY: number,
  //   nZ: number,
  // };


  /**
   * EventType:     9
   * EventName:     NPC 战斗状态改变
   * Params:
   * @dwID          NPC实体ID
   * @bFight        是否战斗中
   * @fCurrentLife  当前生命值
   * @fMaxLife      最大生命值
   * @nCurrentMana  当前蓝量
   * @nMaxMana      最大蓝量
   */
  export interface NpcFightHint {
    dwID: number,
    bFight: boolean,
    fCurrentLife: number,
    fMaxLife: number,
    nCurrentMana: number,
    nMaxMana: number,
  };


  /**
   * EventType: 10
   * EventName: 交互物件进入场景
   * Params:
   * @dwID      交互物件ID
   */
  export interface DoodadEnterScene {
    dwID: number,
  };


  /**
   * EventType: 11
   * EventName: 交互物件离开场景
   * Params:
   * @dwID      交互物件ID
   */
  export interface DoodadLeaveScene {
    dwID: number,
  };


  /**
   * EventType:     12
   * EventName:     交互物件信息数据
   * Notes:         真实数据有6个字段，比文档多了1个
   * Params:
   * @dwID          交互物件ID
   * @dwTemplateID  交互物件模板ID
   * @nX            交互物件 X 坐标
   * @nY            交互物件 Y 坐标
   * @nZ            交互物件 Z 坐标
   */
  // export interface DoodadInfo {
  //   dwID: number,
  //   dwTemplateID: number,
  //   nX: number,
  //   nY: number,
  //   nZ: number,
  // };


  /**
   * EventType:     13
   * EventName:     BUFF 刷新
   * HasCheck:      true
   * Params:
   * @dwPlayerID    玩家ID
   * @bDelete       是获得BUFF还是失去BUFF
   * @nIndex        无规律的数字
   * @bCanCancel    是否是可以右键点掉的BUFF
   * @dwBuffID      BUFF ID
   * @nStackNum     BUFF 层数
   * @nEndFrame     BUFF 正常情况下的结束时间
   * @bInit         不知道干嘛的
   * @nLevel        BUFF 等级
   * @dwSkillSrcID  来源ID，谁给我上的BUFF
   * @bIsValid      不知道干嘛的
   */
  export interface BuffUpdate {
    dwPlayerID: number,
    bDelete: boolean,
    nIndex: number,
    bCanCancel: boolean,
    dwBuffID: number,
    nStackNum: number,
    nEndFrame: number,
    bInit: boolean,
    nLevel: number,
    dwSkillSrcID: number,
    bIsValid: boolean,
  };


  /**
   * EventType:   14
   * EventName:   角色喊话（仅记录NPC）(未校对)
   * Params:
   * @szText      喊话内容
   * @dwTalkerID  角色ID
   * @nChannel    频道
   * @szName      角色名称
   */
  // export interface PlayerSay {
  //   szText: string,
  //   dwTalkerID: number,
  //   nChannel: string,
  //   szName: string,
  // };


  /**
   * EventType:       15
   * EventName:       显示警告框
   * Params:
   * @szWarningType   ?Warning类型
   * @szText          ?Warning内容
   */
  export interface OnWarningMessage {
    szWarningType: string,
    szText: string,
  };


  /**
   * EventType:     16
   * EventName:     团队添加成员(未校对)
   * Params:
   * @dwTeamID      ?团队ID
   * @dwMemberID    ?成员ID
   * @nGroupIndex   ?成员的团队内部编号
   */
  // export interface PartyAddMember {
  //   dwTeamID: number,
  //   dwMemberID: number,
  //   nGroupIndex: number,
  // };


  /**
   * EventType:     17
   * EventName:     团队成员在线状态改变(未校对)
   * HasCheck:      false
   * Params:
   * @dwTeamID      ?团队ID
   * @dwMemberID    ?成员ID
   * @nOnlineFlag   ?在线状态标识
   */
  // export interface PartySetMemberOnlineFlag {
  //   dwTeamID: number,
  //   dwMemberID: number,
  //   nOnlineFlag: number,
  // };


  /**
   * EventType:   18
   * EventName:   系统消息
   * Params:
   * @szText      ?Msg内容 
   * @szChannel   ?Msg频道
   */
  export interface MsgSys {
    szText: string,
    szChannel: string,
  };


  /**
   * EventType:   19
   * EventName:   技能施放日志
   * Params:
   * @dwCaster    技能施放者
   * @dwSkillID   技能ID
   * @dwLevel     技能等级
   */
  export interface SysMsgUiOmeSkillCastLog {
    dwCaster: number,
    dwSkillID: number,
    dwLevel: number,
  };


  /**
   * EventType:   20
   * EventName:   技能施放结果日志
   * Params:
   * @dwCaster    技能施放者
   * @dwSkillID   技能ID
   * @dwLevel     技能等级
   * @nRespond    ???
   */
  export interface SysMsgUiOmeSkillCastRespondLog {
    dwCaster: number,
    dwSkillID: number,
    dwLevel: number,
    nRespond: number,
  };


  /**
   * EventType:         21
   * EventName:         技能最终产生的效果（生命值的变化）
   * Params:
   * @dwCaster          施放者
   * @dwTarget          目标
   * @bReact            是否为反击
   * @nType             Effect类型
   * @dwID              Effect的ID
   * @dwLevel           Effect的等级
   * @bCriticalStrike   是否会心
   * @nCount            tResultCount数据表中元素个数
   * @tResultCount      数值集合
   */
  export interface SysMsgUiOmeSkillEffectLog {
    dwCaster: number,
    dwTarget: number,
    bReact: number,
    nType: number,
    dwID: number,
    dwLevel: number,
    bCriticalStrike: boolean,
    nCount: number,
    tResultCount: object,
  };


  /**
   * EventType:     22
   * EventName:     格挡日志
   * Params:
   * @dwCaster      施放者
   * @dwTarget      目标
   * @nType         Effect的类型
   * @dwID          Effect的ID
   * @dwLevel       Effect的等级
   * @nDamageType   伤害类型
   */
  export interface SysMsgUiOmeSkillBlockLog {
    dwCaster: number,
    dwTarget: number,
    nType: number,
    dwID: number,
    dwLevel: number,
    nDamageType: number,
  };


  /**
   * EventType:   23
   * EventName:   技能被屏蔽日志
   * Params:
   * @dwCaster    施放者
   * @dwTarget    目标
   * @nType       Effect的类型
   * @dwID        Effect的ID
   * @dwLevel     Effect的等级
   */
  export interface SysMsgUiOmeSkillShieldLog {
    dwCaster: number,
    dwTarget: number,
    nType: number,
    dwID: number,
    dwLevel: number,
  };


  /**
   * EventType:   24
   * EventName:   技能未命中目标日志
   * Params:
   * @dwCaster    施放者
   * @dwTarget    目标
   * @nType       Effect的类型
   * @dwID        Effect的ID
   * @dwLevel     Effect的等级
   */
  export interface SysMsgUiOmeSkillMissLog {
    dwCaster: number,
    dwTarget: number,
    nType: number,
    dwID: number,
    dwLevel: number,
  };


  /**
   * EventType:   25
   * EventName:   技能命中目标日志
   * Params:
   * @dwCaster    施放者
   * @dwTarget    目标
   * @nType       Effect的类型
   * @dwID        Effect的ID
   * @dwLevel     Effect的等级
   */
  export interface SysMsgUiOmeSkillHitLog {
    dwCaster: number,
    dwTarget: number,
    nType: number,
    dwID: number,
    dwLevel: number,
  };


  /**
   * EventType:   26
   * EventName:   技能被闪避日志
   * Params:
   * @dwCaster    施放者
   * @dwTarget    目标
   * @nType       Effect的类型
   * @dwID        Effect的ID
   * @dwLevel     Effect的等级
   */
  export interface SysMsgUiOmeSkillDodgeLog {
    dwCaster: number,
    dwTarget: number,
    nType: number,
    dwID: number,
    dwLevel: number,
  };


  /**
   * EventType:       27
   * EventName:       普通治疗日志
   * Params:
   * @dwCharacterID   承疗玩家ID
   * @nDeltaLife      增加血量值
   */
  export interface SysMsgUiOmeCommonHealthLog {
    dwCharacterID: number,
    nDeltaLife: number,
  };


  /**
   * EventType:       28
   * EventName:       死亡日志
   * Params:
   * @dwCharacterID   死亡目标ID
   * @dwKiller        击杀者ID
   */
  export interface SysMsgUiOmeDeathNotify {
    dwCharacterID: number,
    dwKiller: number,
  };


  /**
   * EventType: 29
   * EventName: 目标坐标信息（未校对）
   *
   * @dwType    目标类型
   * @dwID      目标ID
   * @nX        目标ID
   * @nY        目标 Y 坐标
   * @nZ        目标 Z 坐标
   */
  // export interface TargetLocation {
  //   dwType: number,
  //   dwID: number,
  //   nX: number,
  //   nY: number,
  //   nZ: number,
  // };

};


export namespace Game {

  /**
 * Name             玩家基础信息
 * Params:
 * @name            玩家名称
 * @dwMountKungfu   玩家心法
 * @nEquipScore     玩家装分
 * @aEquip          玩家装备列表
 * @aTalent         玩家奇穴列表
 */
  export interface BasePlayer {
    id: number,
    name: string;
    xf: XinFa;
    nEquipScore: number;
    // aEquip: Array<Equip>;
    aTalent: Array<Talent>;
  };
}