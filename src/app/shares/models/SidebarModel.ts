export class SidebarModel {
    FunctionID:string
    DefaultName?:string
    ParentID:string | null
    Active?:boolean
    Children:Array<SidebarModel> = []
    Url:string | null
    Icon?:string | null
}
