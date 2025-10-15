import Base from "./base";
import { MediaType } from "@/types";

export default interface Media extends Base {
  url: string;
  type: MediaType;
  order: number;
}
