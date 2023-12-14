import {FieldType} from "@apitable/widget-sdk";
import {values} from "lodash";
import {FIELD_GROUPS, TYPE_OPTIONS} from "../constants";

export const getOptions = (value: FieldType, fieldValue: any) => {
  // Non attachment object data
  const isObjectArr = !Array.isArray(fieldValue) && typeof fieldValue === "object" && !(fieldValue as any).filename;
  const isStr = typeof fieldValue === "string";
  if (isObjectArr) {
    return TYPE_OPTIONS.filter((option) => option.value === FieldType.Text);
  }
  let groupValue = values(FIELD_GROUPS).filter((group) => group.some((g) => g === value))[0];
  if (isStr) {
    groupValue = FIELD_GROUPS.string;
  }

  return TYPE_OPTIONS.filter((option) => groupValue.includes(option.value));
};
