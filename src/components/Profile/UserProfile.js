import ProfileForm from "./ProfileForm";

const UserProfile = () => {
  return (
    <section>
      <h4
        style={{ display: "flex", justifyContent: "center", marginTop: "5vh" }}
      >
        Change Your Password
      </h4>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
