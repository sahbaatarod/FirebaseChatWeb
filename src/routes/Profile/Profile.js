import React from "react";
import { withRouter } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Ads from "../../components/Ads/Ads";
// Firebase
import { auth, realDb, firebaseApp } from "../../firebase";
import Card from "../../components/Card/Card";
import { Input, Button, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
// Redux
import { connect } from "react-redux";
import { changeLoad } from "../../redux/action";
// Notif
import CloseCircleOutlined from "@ant-design/icons/CloseCircleOutlined";
import CheckCircleOutlined from "@ant-design/icons/CheckCircleOutlined";
import { openNotification as openSuccess } from "../../components/Notifications/Success/NotifSuccess";
import { openNotification as openError } from "../../components/Notifications/Error/NotifSuccess";
function Profile({ changeLoad, history }) {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [name, setName] = React.useState("");
  const [load, setLoad] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [dl, setDl] = React.useState("");
  const [imgObj, setImgObj] = React.useState("");
  const storage = firebaseApp.storage().ref(`images/${imgObj.name}`);

  // Upload View

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      return setLoad(true);
    }
    if (info.file.status === "done") {
      setImgObj(info.file.originFileObj);
      getBase64(info.file.originFileObj, (imageUrl) => handle(imageUrl));
    }
  };

  const handle = (i) => {
    setLoad(false);
    return setImage(i);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      alert("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      alert("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <div>
      {load ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // Upload to storage

  const handleUpdate = async () => {
    if (
      name.length < 1 &&
      pass.length < 1 &&
      image.length < 1 &&
      email.length < 1
    ) {
      openError(
        "topRight",
        "Please fill in Inputs .",
        <CloseCircleOutlined style={{ color: "#ff4141" }} />
      );
    } else {
      changeLoad();
      if (imgObj) {
        await storage
          .put(imgObj)
          .then(async () => {
            await storage
              .getDownloadURL(`images/${imgObj.name}`)
              .then((res) => {
                const user = auth.currentUser;
                realDb
                  .ref(`users/${user.uid}`)
                  .set({
                    fullname: name.length ? name : user.displayName,
                    uid: user.uid,
                    profileImgUrl: res
                      ? res
                      : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
                  })
                  .then(async () => {
                    if (email.length) {
                      await user.updateEmail(email);
                    }
                    if (pass.length) {
                      await user.updatePassword(pass);
                    }
                    if (name.length) {
                      await user.updateProfile({
                        displayName: name,
                      });
                    }
                    if (res) {
                      await user.updateProfile({ photoURL: res });
                    } else {
                      await user.updateProfile({
                        photoURL:
                          "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
                      });
                    }
                  })
                  .then(() => {
                    changeLoad();
                    setEmail("");
                    setName("");
                    setImage("");
                    setDl("");
                    setPass("");
                    openSuccess(
                      "topRight",
                      "Profile Updated Successfully !",
                      <CheckCircleOutlined style={{ color: "#1cd777" }} />
                    );
                    history.push("/");
                  })
                  .catch((e) => {
                    changeLoad();
                    setEmail("");
                    setImage("");
                    setDl("");
                    setName("");
                    setPass("");
                    openError(
                      "topRight",
                      e.message,
                      <CloseCircleOutlined style={{ color: "#ff4141" }} />
                    );
                  });
              });
          })

          .catch((e) => {
            alert(e.message);
          });
      } else {
        const user = auth.currentUser;
        realDb
          .ref(`users/${user.uid}`)
          .set({
            fullname: name.length ? name : user.displayName,
            uid: user.uid,
            profileImgUrl:
              "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
          })
          .then(async () => {
            if (email.length) {
              await user.updateEmail(email);
            }
            if (pass.length) {
              await user.updatePassword(pass);
            }
            if (name.length) {
              await user.updateProfile({
                displayName: name,
                photoURL:
                  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
              });
            }
          })
          .then(() => {
            changeLoad();
            setEmail("");
            setName("");
            setPass("");
            setImage("");
            setDl("");
            openSuccess(
              "topRight",
              "Profile Updated Successfully !",
              <CheckCircleOutlined style={{ color: "#1cd777" }} />
            );
            history.push("/");
          })
          .catch((e) => {
            changeLoad();
            setEmail("");
            setName("");
            setPass("");
            setImage("");
            setDl("");
            openError(
              "topRight",
              e.message,
              <CloseCircleOutlined style={{ color: "#ff4141" }} />
            );
          });
      }
    }
  };
  return (
    <Layout title="Profile">
      <Ads></Ads>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2em" }}
      >
        <Card width={"290px"} borderRadius="8px" boxShadow="0 0 10px #dedede">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={() => history.goBack()}>{"<"}</Button>
            <h4 style={{ textAlign: "center", paddingBottom: "1em" }}>
              Edit your Profile
            </h4>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "1em",
            }}
          >
            <div>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://jsonplaceholder.typicode.com/posts/"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {image ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={image}
                      alt="avatar"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>
          </div>

          <Input
            value={name}
            placeholder={auth.currentUser.displayName}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
          ></Input>
          <Input
            style={{ marginTop: ".7em" }}
            value={email}
            placeholder={auth.currentUser.email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
          ></Input>
          <Input
            style={{ marginTop: ".7em" }}
            value={pass}
            type="password"
            onChange={(e) => {
              setPass(e.target.value);
            }}
            placeholder="Password"
          ></Input>
          <div
            style={{
              marginTop: ".7em",
              display: "flex",
            }}
          >
            <Button
              style={{ width: "100%" }}
              onClick={handleUpdate}
              type="primary"
            >
              Update Profile
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
const mapState = (state) => {
  return {};
};
const mapDis = (dispatch) => {
  return {
    changeLoad: () => dispatch(changeLoad()),
  };
};
export default connect(mapState, mapDis)(withRouter(Profile));

// if user uploaded image ->
//
// upload image to firebase storage then get url of that image else put null render default avatar on frontend
// then find user in users by anonymus uid and update imgurl and email and password
// then update anonymus user email password photoUrl
// then notif profile updated
// then redirect homepage
