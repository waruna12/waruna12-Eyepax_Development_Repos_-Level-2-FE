import ProfileForm from "./ProfileForm";
import classes from "./UserProfile.module.css";

const UserProfile = () => {
  return (
    <section className={classes.profile}>
      <h4>Change Your Password</h4>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
