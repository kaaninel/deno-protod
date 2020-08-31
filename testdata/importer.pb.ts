// Generated by protod v0.1.3
import {
  FieldSet,
  JSON,
  fromBytes,
  fromJSON,
  toBytes,
  toJSON,
} from "../mod.ts";
import {
  Importee,
} from "./importee.pb.ts";

export class Importer {
  msg: Importee;

  constructor(init: Partial<Importer>) {
    this.msg = init.msg ?? new Importee({});
  }

  static fields: FieldSet<Importer> = {
    msg: [1, Importee],
  };

  static fromBytes(bytes: Uint8Array): Importer {
    return new Importer(
      fromBytes<Importer>(bytes, Importer.fields),
    );
  }

  static fromJSON(json: JSON): Importer {
    return new Importer(
      fromJSON<Importer>(json, Importer.fields),
    );
  }

  toBytes(): Uint8Array {
    return toBytes<Importer>(this, Importer.fields);
  }

  toJSON() {
    return toJSON<Importer>(this, Importer.fields);
  }
}