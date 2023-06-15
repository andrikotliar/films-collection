export type DataTypes = 'string' | 'number' | 'boolean' | 'array' | 'object';

export type DataExplanation = {
  property: string;
  type: DataTypes[];
  description: string;
  required: boolean;
  requiredPartially?: boolean;
  arrayItemsType?: DataTypes[];
  possibleValues?: string[];
  properties?: DataExplanation[];
  valueExample?: string | string[] | string[];
}