import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { bracketActions, authActions } from "../../reduxStore/store";

import GroupSortingContainer from "../../components/groupSelection/GroupSortingContainer/GroupSortingContainer";
import BackToProfile from "../../components/BackToProfile/BackToProfile";
import StageHeader from "../../components/StageHeader/StageHeader";
import GroupNavigationbar from "../../components/GroupNavigationBar/GroupNavigationBar";
import Loading from "../../components/Loading/Loading";

import styles from "./GroupSelectionPage.module.css";

const URL = process.env.REACT_APP_SERVER_URL;

const GroupSelectionPage = ({ group }) => {
  const dispatch = useDispatch();

  const [countriesArr, setCountriesArr] = useState(group);
  const [hasEdited, setHasEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector((state) => state.auth.userId);

  const saveChangeHandler = () => {
    setIsLoading(true);
    let body = {
      userId,
      countriesArr
    }
    axios.post(`${URL}/bracket/set-group-stage`, body).then((res) => {
      setIsLoading(false);
      setHasEdited(false);
      dispatch(bracketActions.setGroupsArr(res.data[3].rows))
      dispatch(bracketActions.setRo16Arr(res.data[3].rows))
      dispatch(bracketActions.setRo16Winners(res.data[4].rows));
      if ((res.data[4].rows).length < 8) {
        dispatch(authActions.setIsQuarterFinalsComplete(false));
      }
    });
  }

  return (
    <>
    {isLoading ? <Loading /> : ""}
      <BackToProfile path={"/group-stage"} backTo={"Group Stage"}/>
      <StageHeader stage={"Group Stage"} otherInfo={"Nov 22-29"} />
      <div className={styles["content-container"]}>
        <h1 className={styles.heading1}>Group {group[0].group_letter.toUpperCase()}</h1>
        <GroupSortingContainer countriesArr={countriesArr} setCountriesArr={setCountriesArr} setHasEdited={setHasEdited} group={group}/>
        <GroupNavigationbar hasEdited={hasEdited} saveChangeHandler={saveChangeHandler}/>
      </div>
    </>
  );
};

export default GroupSelectionPage;
