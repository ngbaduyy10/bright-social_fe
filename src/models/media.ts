import Base from "./base";

export default interface Media extends Base {
  url: string;
  type: MediaType;
  order: number;
}
