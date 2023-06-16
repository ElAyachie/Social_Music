import JB7pic from '../../assets/profile_pics/JB7.png';
import JT0pic from '../../assets/profile_pics/JT0.png';
import Fakerpic from '../../assets/profile_pics/Faker.png';
import Donatellopic from '../../assets/profile_pics/Donatello.png';
import CR7pic from '../../assets/profile_pics/CR7.png';
import Sonaldopic from '../../assets/profile_pics/Sonaldo.png';
import Goatpic from '../../assets/profile_pics/Goat.png';
import blankUser from '../../assets/profile_pics/blankUser.jpg';

const images = {
  "JB7": JB7pic,
  "JT0": JT0pic,
  "Faker": Fakerpic,
  "Donatello": Donatellopic,
  "CR7": CR7pic,
  "Sonaldo": Sonaldopic,
  "Goat": Goatpic
};

function getImageByKey(key) {
  if (images[key] !== undefined) {
    return images[key];
  }
  return blankUser
}

export default getImageByKey