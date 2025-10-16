import Base from "./base";
import { MediaType } from "@/types";

export default interface Media extends Base {
  url: string;
  type: MediaType;
  width: number;
  height: number;
  order: number;
}
