import classes from "./StartingPageContent.module.css";
import PieChartContent from "./PieChart";
import BarChartContent from "./BarChartContent";
import InviteNewUser from "./InviteNewUser";
import Slide from "./Slide";
const StartingPageContent = () => {
  return (
    <section className={classes.starting}>
      <h4>Welcome on Board!</h4>
      <InviteNewUser />
      <div className={classes.maincontent}>
        <PieChartContent />
        <BarChartContent />
      </div>
      <Slide />
    </section>
  );
};

export default StartingPageContent;