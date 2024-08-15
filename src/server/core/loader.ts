import { JCL } from "../typed";


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
