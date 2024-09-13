export interface currentUserType {
  uid: string;
  databaseId: string;
  email: string;
  photoUrl: string;
  displayName: string;
  userType: string;
}


export interface reduxUserType {
  user:{user: currentUserType}
}