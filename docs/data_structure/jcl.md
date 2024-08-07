# .jcl文件数据结构解析

> 本文档持续更新，当前版本更新时间：2024-08-02 15:27

## 行数据

在.jcl文件中，每一行都是一条战斗日志，每一行的数据结构一致。

|参数名称|类型|备注|
|---|---|---|
|crc|number|crc校验码（已废弃）|
|frame|number|事件发生的游戏帧数 (过图时可能为0) |
|ts|number|unix时间戳|
|delay|number|客户端从启动开始计算的毫秒数|
|eventType|number|事件类型枚举|
|luadataStr|string|[Lua事件](#lua事件)|
### Lua事件

> **事件列表**和**参数列表**中“是否已校对”是什么意思？
>
> - 事件列表中的“是否已校对”：
>   - ✔️：保证参数的个数正确
>   - ❌：不保证参数的个数正确
> - 参数列表中的“是否已校对”：
>   - ✔️：保证参数的意义正确
>   - ❌：不保证参数的意义正确

|枚举值|事件名称|是否已校对|备注|
|---|---|---|---|
|1|FightTime|✔️|[战斗时间](#战斗时间)|
|2|PlayerEnterScene|✔️|[玩家进入场景](#玩家进入场景)|
|3|PlayerLeavecene|✔️|[玩家离开场景](#玩家离开场景)|
|4|PlayerInfo|✔️|[玩家信息数据](#玩家信息数据)|
|5|PlayerFightHint|✔️|[玩家战斗状态改变](#玩家战斗状态改变)|
|6|NpcEnterScene|✔️|[NPC进入场景](#NPC进入场景)|
|7|NpcLeavecene|✔️|[NPC离开场景](#NPC离开场景)|
|8|NpcInfo|❌|[NPC信息数据](#NPC信息数据)|
|9|NpcFightHint|✔️|[NPC战斗状态改变](#NPC战斗状态改变)|
|10|DoodadEnterScene|✔️|[交互物件进入场景](#交互物件进入场景)|
|11|DoodadLeaveScene|✔️|[交互物件离开场景](#交互物件离开场景)|
|12|DoodadInfo|❌|[交互物件信息数据](#交互物件信息数据)|
|13|BuffUpdate|✔️|[BUFF刷新](#BUFF刷新)|
|14|PlayerSay|❌|[角色喊话（仅记录NPC）](#角色喊话（仅记录NPC）)|
|15|OnWarningMessage|✔️|[显示警告框](#显示警告框)|
|16|PartyAddMember|❌|[团队添加成员](#团队添加成员)|
|17|PartySetMemberOnlineFlag|❌|[团队成员在线状态改变](#团队成员在线状态改变)|
|18|MsgSys|✔️|[系统消息](#系统消息)|
|19|SysMsgUiOmeSkillCastLog|✔️|[技能施放日志](#技能施放日志)|
|20|SysMsgUiOmeSkillCastRespondLog|✔️|[技能施放结果日志](#技能施放结果日志)|
|21|SysMsgUiOmeSkillEffectLog|✔️|[技能最终产生的效果（生命值的变化）](#技能最终产生的)|
|22|SysMsgUiOmeSkillBlockLog|✔️|[格挡日志](#格挡日志)|
|23|SysMsgUiOmeSkillShieldLog|✔️|[技能被屏蔽日志](#技能被屏蔽日志)|
|24|SysMsgUiOmeSkillMissLog|✔️|[技能未命中目标日志](#技能未命中目标日志)|
|25|SysMsgUiOmeSkillHitLog|✔️|[技能命中目标日志](#技能命中目标日志)|
|26|SysMsgUiOmeSkillDodgeLog|✔️|[技能被闪避日志](#技能被闪避日志)|
|27|SysMsgUiOmeCommonHealthLog|✔️|[普通治疗日志](#普通治疗日志)|
|28|SysMsgUiOmeDeathNotify|✔️|[死亡日志](#死亡日志)|
|29|TargetLocation|❌|[目标坐标信息](#目标坐标信息)|

#### 战斗时间
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|bFighting|number|✔️|战斗开始还是结束|
|1|szUUID|number|✔️|[Jcl记录者的角色信息](#jcl记录者的角色信息)|
|2|nDuring|number|✔️|[战斗持续时间](#战斗持续时间)|
|3|dwMapID|number|✔️|[战斗所在的地图ID](#战斗所在的地图id)|
##### Jcl记录者的角色信息
格式为 "客户端::大区_服务器::当前时间戳::(未知)::(未知)::(未知)"
##### 战斗持续时间
开始时间固定为0
##### 战斗所在的地图ID
对应关系见 [魔盒数据库](https://data.jx3box.com/map/data/map_index.json)
#### 玩家进入场景
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|dwID|number|✔️|玩家ID|
#### 玩家离开场景
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|dwID|number|✔️|玩家ID|
#### 玩家信息数据
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|dwID|number|✔️|玩家ID|
|1|szName|string|✔️|玩家名称|
|2|dwForceID|number|✔️|[玩家势力ID](#玩家势力id)|
|3|dwMountKungfuID|number|✔️|玩家心法ID|
|4|nEquipScore|number|✔️|玩家装分|
|5|aEquip|object|✔️|玩家装备列表|
|6|aTalent|object|✔️|玩家奇穴列表|
|7|szGUID|number|✔️|[玩家GUID](#玩家guid)|
|8|_|object \| null|❌|未知|
##### 玩家势力ID
在游戏里门派是有ID的，门派也会对应势力，势力也有势力ID。大多数地方用势力ID表示玩家所在的门派，具体映射关系见 [魔盒数据库](https://github.com/JX3BOX/jx3box-data/blob/master/data/xf/xf.json)
##### 玩家GUID
不同于玩家ID，GUI可以在所有服务器中，唯一标注一名玩家
#### 玩家战斗状态改变
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|dwID|number|✔️|玩家ID|
|1|bFight|boolean|✔️|是否战斗中|
|2|fCurrentLife|number|✔️|当前生命值|
|3|fMaxLife|number|✔️|最大生命值|
|4|nCurrentMana|number|✔️|当前蓝量|
|5|nMaxMana|number|✔️|最大蓝量|
#### NPC进入场景
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|dwID|number|✔️|[NPC实体ID](#npc实体id)|
##### NPC实体ID
在游戏内体现为一个1开头的，比玩家ID长很多的数。与之对应的是NPC模板ID，可以简单理解成类和实例的关系
#### NPC离开场景
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|dwID|number|✔️|[NPC实体ID](#npc实体id)|
#### NPC信息数据

真实数据有8个元素，文档只有7个元素，无法对应

|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|dwID|number|❌|NPC ID|
|1|szName|string|❌|NPC名称|
|2|dwTemplateID|number|❌|模板ID|
|3|dwEmployer|number|❌|[NPC所属的玩家ID](#npc所属的玩家id)|
|4|nX|number|❌|NPC的 X 坐标|
|5|nY|number|❌|NPC的 Y 坐标|
|6|nZ|number|❌|NPC的 Z 坐标|
##### NPC所属的玩家ID
比如毒经的蛇，这个字段会指向毒经的玩家ID
#### NPC战斗状态改变
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|dwID|number|✔️|NPC实体ID|
|1|bFight|boolean|✔️|是否战斗中|
|2|fCurrentLife|number|✔️|当前生命值|
|3|fMaxLife|number|✔️|最大生命值|
|4|nCurrentMana|number|✔️|当前蓝量|
|5|nMaxMana|number|✔️|最大蓝量|
#### 交互物件进入场景
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|dwID|number|✔️|交互物件ID|
#### 交互物件离开场景
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|dwID|number|✔️|交互物件ID|
#### 交互物件信息数据

真实数据有6个字段，比文档多了1个

|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|dwID|number|❌|交互物件ID|
|1|dwTemplateID|number|❌|[交互物件模板ID](#交互物件模板id)|
|2|nX|number|❌|交互物件 X 坐标|
|3|nY|number|❌|交互物件 Y 坐标|
|4|nZ|number|❌|交互物件 Z 坐标|
##### 交互物件模板ID
跟NPC是一样的，可以查询 [魔盒数据库](https://www.jx3box.com/app/database?type=doodad)
#### BUFF刷新
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|dwPlayerID|number|✔️| 获得者ID                    |
|1|bDelete|boolean|✔️|是获得BUFF还是失去BUFF|
|2|nIndex|number|✔️|无规律的数字|
|3|bCanCancel|boolean|✔️|是否是可以右键点掉的BUFF|
|4|dwBuffID|number|✔️|BUFF ID|
|5|nStackNum|number|✔️|BUFF 层数|
|6|nEndFrame|number|✔️|BUFF 正常情况下的结束时间|
|7|bInit|boolean|❌|未知|
|8|nLevel|number|✔️|BUFF 等级|
|9|dwSkillSrcID|number|✔️|[BUFF 来源ID](#buff-来源id)|
|10|bIsValid|boolean|❌|未知|
##### BUFF 来源ID
谁给我上的BUFF
#### 角色喊话（仅记录NPC）
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|szText|string|❌|喊话内容|
|1|dwTalkerID|number|❌|角色ID|
|2|nChannel|string|❌|频道|
|3|szName|string|❌|角色名称|
#### 显示警告框
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|szWarningType|string|✔️|Warning类型|
|1|szText|string|✔️|Warning内容|
#### 团队添加成员
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|dwTeamID|number|❌|团队ID|
|1|dwMemberID|number|❌|成员ID|
|2|nGroupIndex|number|❌|成员的团队内部编号|
#### 团队成员在线状态改变
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|dwTeamID|number|❌|团队ID|
|1|dwMemberID|number|❌|成员ID|
|2|nOnlineFlag|number|❌|在线状态标识|
#### 系统消息
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|szText|string|✔️|Msg内容|
|1|szChannel|string|✔️|Msg频道|
#### 技能施放日志
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|dwCaster|number|✔️|技能施放者|
|1|dwSkillID|number|✔️|技能ID|
|2|dwLevel|number|✔️|技能等级|
#### 技能施放结果日志
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|dwCaster|number|✔️|技能施放者|
|1|dwSkillID|number|✔️|技能ID|
|2|dwLevel|number|✔️|技能等级|
|3|nRespond|number|❌|未知|
#### 技能最终产生的效果（生命值的变化）
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|dwCaster|number|✔️|施放者|
|1|dwTarget|number|✔️|目标|
|2|bReact|number|✔️|是否为反击|
|3|nType|number|✔️|Effect类型|
|4|dwID|number|✔️|Effect的ID|
|5|dwLevel|number|✔️|Effect的等级|
|6|bCriticalStrike|boolean|✔️|是否会心|
|7|nCount|number|✔️|tResultCount数据表中元素个数|
|8|tResultCount|object|✔️|数值集合|
#### 格挡日志
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|dwCaster|number|✔️|施放者|
|1|dwTarget|number|✔️|目标|
|2|nType|number|✔️|Effect的类型|
|3|dwID|number|✔️|Effect的ID|
|4|dwLevel|number|✔️|Effect的等级|
|5|nDamageType|number|✔️|伤害类型|
#### 技能被屏蔽日志
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|dwCaster|number|✔️|施放者|
|1|dwTarget|number|✔️|目标|
|2|nType|number|✔️|Effect的类型|
|3|dwID|number|✔️|Effect的ID|
|4|dwLevel|number|✔️|Effect的等级|
#### 技能未命中目标日志
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|dwCaster|number|✔️|施放者|
|1|dwTarget|number|✔️|目标|
|2|nType|number|✔️|Effect的类型|
|3|dwID|number|✔️|Effect的ID|
|4|dwLevel|number|✔️|Effect的等级|
#### 技能命中目标日志
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|dwCaster|number|✔️|施放者|
|1|dwTarget|number|✔️|目标|
|2|nType|number|✔️|Effect的类型|
|3|dwID|number|✔️|Effect的ID|
|4|dwLevel|number|✔️|Effect的等级|
#### 技能被闪避日志
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|dwCaster|number|✔️|施放者|
|1|dwTarget|number|✔️|目标|
|2|nType|number|✔️|Effect的类型|
|3|dwID|number|✔️|Effect的ID|
|4|dwLevel|number|✔️|Effect的等级|
#### 普通治疗日志
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|dwCharacterID|number|✔️|承疗玩家ID|
|1|nDeltaLife|number|✔️|增加血量值|
#### 死亡日志
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|dwCharacterID|number|✔️|死亡目标ID|
|1|dwKiller|number|✔️|击杀者ID|
#### 目标坐标信息
|索引|参数名称|类型|是否已校对|备注|
|---|---|---|---|---|
|0|dwType|number|❌|目标类型|
|1|dwID|number|❌|目标ID|
|2|nX|number|❌|目标ID|
|3|nY|number|❌|目标 Y 坐标|
|4|nZ|number|❌|目标 Z 坐标|

## 鸣谢

感谢下列文档作者和老师对我整理这份文档提供的帮助：

- [《jcl数据格式整理》]([茶馆 » 魔盒（JX3BOX） - 一站式剑网3资源工具站](https://www.jx3box.com/community/576?page=1&onlyAuthor=false))
- [《【战斗分析】茗伊战斗日志(JCL)数据说明文档》](https://www.jx3box.com/tool/46269)
- 魔盒签约作者：不咕

## 关于

该文档目的是为了统一.jcl文件在TypeScript中的标准输出，让开发者可以直接使用标准输出，而无需考虑.jcl文件本身的读取与解析，方便前端数据分析项目对jcl数据的使用。后续会基于该文档内容进行二次封装，让jcl数据变得更加易用。

## 相关

[![NPM version](https://img.shields.io/npm/v/jcl-loader.svg?style=flat)](https://npmjs.com/package/jcl-loader)