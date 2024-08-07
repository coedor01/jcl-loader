# jcl-loader

[![NPM version](https://img.shields.io/npm/v/jcl-loader.svg?style=flat)](https://npmjs.com/package/jcl-loader)
[![NPM downloads](http://img.shields.io/npm/dm/jcl-loader.svg?style=flat)](https://npmjs.com/package/jcl-loader)

## Install

```bash
$ pnpm install
```

```bash
$ npm run dev
$ npm run build
```

## Usage
### filter
```typescript
import { JCL, EventType, LuaDataType } from "jcl-loader/dist/cjs/typed";
import { loadRaw, createParser, createParserWithLruCache } from "jcl-loader/dist/cjs/loader";

// 筛选指定的EventType的日志
const raw: Array<JCL.RawLine> = loadRaw(
  `638309433	4388291	1716702578	200309	21	{536944023,536944023,0,1,755,1,false,2,{[13]=0,[14]=0}}
638309433	4388291	1716702578	200309	30	{536944023,536944023,0,1,755,1,false,2,{[13]=0,[14]=0}}`
).filter(item => [EventType.SysMsgUiOmeSkillEffectLog].includes(item.eventType));

// 创建解析器
const parser = createParser(raw);
const parsedData: Array<
  JCL.Line<LuaDataType.SysMsgUiOmeSkillEffectLog>
> = parser<
  LuaDataType.SysMsgUiOmeSkillEffectLog
>(EventType.SysMsgUiOmeSkillEffectLog);
```
Output
```json
[{"crc":638309433,"frame":4388291,"ts":1716702578,"delay":200309,"eventType":21,"luadata":{"dwCaster":536944023,"dwTarget":536944023,"bReact":0,"nType":1,"dwID":755,"dwLevel":1,"bCriticalStrike":false,"nCount":2,"tResultCount":{"13":0,"14":0}}}]
```

### filter with lrucache
```typescript
import { JCL, EventType, LuaDataType } from "jcl-loader/dist/cjs/typed";
import { loadRaw, createParser, createParserWithLruCache } from "jcl-loader/dist/cjs/loader";

// 筛选指定的EventType的日志
const raw: Array<JCL.RawLine> = loadRaw(
  `638309433	4388291	1716702578	200309	21	{536944023,536944023,0,1,755,1,false,2,{[13]=0,[14]=0}}
638309433	4388291	1716702578	200309	30	{536944023,536944023,0,1,755,1,false,2,{[13]=0,[14]=0}}`
).filter(item => [EventType.SysMsgUiOmeSkillEffectLog].includes(item.eventType));

// 创建带LRUCache的解析器
const parserWithLruCache = createParserWithLruCache(raw, 10);
const parsedDataWithLruCache: Array<
  JCL.Line<LuaDataType.SysMsgUiOmeSkillEffectLog>
> = parserWithLruCache<
  LuaDataType.SysMsgUiOmeSkillEffectLog
>(EventType.SysMsgUiOmeSkillEffectLog);
```
Output
```json
[{"crc":638309433,"frame":4388291,"ts":1716702578,"delay":200309,"eventType":21,"luadata":{"dwCaster":536944023,"dwTarget":536944023,"bReact":0,"nType":1,"dwID":755,"dwLevel":1,"bCriticalStrike":false,"nCount":2,"tResultCount":{"13":0,"14":0}}}]
```

## Options

TODO

## LICENSE

MIT
