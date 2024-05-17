export interface userInfo {
  user_name: string
  lname: string
  fname: string
  created_at: string
  is_blocked: string
  profile_img_url: string
  img_dir?: string
}

export interface userForm {
  user_name?: string
  lname?: string
  fname?: string
  image?: Blob
  password?: string
}

export interface dbPremission {
  id: string
  premission: string
  Description: string
}

export interface userPremission {
  premission_id: string
  premission: string
  Description: string
  user_id: string
}

export interface ModelClassesType {
  class: string
  selected?: boolean
  report_id: string
}
