import { LuaDataType, Game } from "./typed";

export declare function getForceById(dwForceID: number): Game.Force;

export declare function getKungfuById(dwForceID: number): Game.Kungfu;

export declare function getTalents(items: Array<LuaDataType.Talent>): Array<Game.Talent>;