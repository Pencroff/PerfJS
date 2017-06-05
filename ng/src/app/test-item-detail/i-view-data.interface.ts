/**
 * Created by Sergey Daniloff on 05.06.2017.
 */

export interface IViewData {
  id: string;
  kebabName: string;
  name: string;
  platform: string;
  source: string;
  cases: IViewDataCase[];
}

export interface IViewDataCase {
  id: string;
  name: string;
  source: string;
}
