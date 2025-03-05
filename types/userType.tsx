export interface currentUserType {
  uid: string;
  email: string;
  isAdmin:boolean;
  photoUrl: string;
  username: string;
  userType: string;
}

export interface reduxUserType {
  user: { user: currentUserType};
}

