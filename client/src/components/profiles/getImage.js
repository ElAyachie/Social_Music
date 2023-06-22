import blankUser from '../../assets/BlankUser1.png'

function getImage (profileImage) {
  if (profileImage !== null && profileImage !== undefined) {
    return profileImage;
  }
  else {
    return blankUser;
  }
}

export default getImage