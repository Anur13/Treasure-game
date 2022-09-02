import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CheckResultsDto {
  @IsArray()
  moves: MovePosition[];

  @IsString()
  @IsNotEmpty()
  playerName: string;

  @IsNumber()
  turns: number;
}

export class Position {
  @IsNotEmpty()
  rowPosition: number;

  @IsNotEmpty()
  columnPosition: number;
}

export class MovePosition extends Position {
  result?: string | number;
  isTreasure?: boolean;
}
