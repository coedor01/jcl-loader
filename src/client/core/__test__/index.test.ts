import { loadRaw, createParser, createParserWithLruCache } from "..";
import { EventType, LuaDataType } from "../../typed";


describe("load module", () => {
  test("load function", () => {
    expect(
      loadRaw("638309433	4388291	1716702578	200309	21	{536944023,536944023,0,1,755,1,false,2,{[13]=0,[14]=0}}")[0].crc
    ).toBe(638309433);
  });

  test("parser function", () => {
    expect(
      createParser(
        loadRaw("638309433	4388291	1716702578	200309	21	{536944023,536944023,0,1,755,1,false,2,{[13]=0,[14]=0}}\n638309433	4388291	1716702578	200309	30	{536944023,536944023,0,1,755,1,false,2,{[13]=0,[14]=0}}")
      )<LuaDataType.SysMsgUiOmeSkillEffectLog>(
        EventType.SysMsgUiOmeSkillEffectLog,
      )[0].luadata.dwCaster
    ).toBe(536944023);
  });
  test("parser function with lru cache", () => {
    expect(
      createParserWithLruCache(
        loadRaw("638309433	4388291	1716702578	200309	21	{536944023,536944023,0,1,755,1,false,2,{[13]=0,[14]=0}}"),
        10
      )<LuaDataType.SysMsgUiOmeSkillEffectLog>(
        EventType.SysMsgUiOmeSkillEffectLog,
      )[0].luadata.dwCaster
    ).toBe(536944023);
  });
});