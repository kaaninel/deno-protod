import { JSON, FieldType, ProtoBufEntry, MetaFieldBuf } from "./types.ts";

/**
 * A helper object for Fields that are "Repeated" (not "Packed").
 */
export const repeatedField = <T>(of: FieldType<T>): MetaFieldBuf<T[]> => ({
  wireType: 2,

  fromBytes(): never {
    throw new Error("repeated fields must not use fromBytes");
  },

  toBytes(): never {
    throw new Error("repeated fields must not use toBytes");
  },

  fromJSON(value: NonNullable<JSON>): T[] {
    if (Array.isArray(value)) {
      const newValue: T[] = [];
      for (const item of Array.from(value)) {
        if (item == null) {
          throw new Error(`malformed json`);
        }
        newValue.push(of.fromJSON(item));
      }
      return newValue;
    } else {
      return [of.fromJSON(value)];
    }
  },
  toJSON(value: T[]): NonNullable<JSON> {
    return value.map((value) => of.toJSON(value));
  },

  fromEntry(entries: ProtoBufEntry[]): T[] {
    const ret: T[] = [];
    for (const entry of entries) {
      if (entry[1] === 0 && of.wireType === 0) {
        ret.push(of.fromBytes(entry[2]));
      } else if (entry[1] !== 0 && of.wireType === entry[1]) {
        ret.push(of.fromBytes(entry[2]));
      }
    }
    return ret;
  },

  toEntry(id: number, value: T[]): ProtoBufEntry[] {
    return value.map((val) =>
      [id, of.wireType, of.toBytes(val)] as ProtoBufEntry
    );
  },
});
