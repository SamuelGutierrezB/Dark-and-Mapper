export type Coordinate = [number, number];

export type MarkerType = 
  | 'blue_Portal' 
  | 'red_Portal' 
  | 'bosses' 
  | 'sanctuary';

export type MarkerData = {
  [key in MarkerType]?: Coordinate[];
};

export type MapFilters = {
  maps: {
    [key: string]: MarkerData;
  };
};