export interface IAttactmentFile {
    type:FileType,
    filesAllowed:any[],
    size:string,
    actions:Actions
}

 export enum FileType {
  Single = 'Single',
  Mulltiple = 'Mulltiple',
}


export interface Actions {
  delete? :string,
  view? :string,
}
