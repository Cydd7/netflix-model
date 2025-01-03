import React from "react";

function Footer() {
  return (
    <>
      <div className="HomeScreen-footer">
        <div className="HomeScreen-footer-icons">
          <div className="HomeScreen-footer-icon">
            <img
              src={require("../Media/social-icons/fb-icon-white.png")}
              alt="Facebook"
            />
          </div>
          <div className="HomeScreen-footer-icon">
            <img
              src={require("../Media/social-icons/insta-icon-white.png")}
              alt="Instagram"
            />
          </div>
          <div className="HomeScreen-footer-icon">
            <img
              src={require("../Media/social-icons/twitter-icon-white.png")}
              alt="Twitter"
            />
          </div>
          <div className="HomeScreen-footer-icon">
            <img
              src={require("../Media/social-icons/yt-icon-white.png")}
              alt="Youtube"
            />
          </div>
        </div>

        <div className="HomeScreen-footer-dummies">
          <div className="HomeScreen-footer-dummy">Audio and Subtitles</div>
          <div className="HomeScreen-footer-dummy">Media Centre</div>
          <div className="HomeScreen-footer-dummy">Privacy</div>
          <div className="HomeScreen-footer-dummy">Contact Us</div>
          <div className="HomeScreen-footer-dummy">Audio Description</div>
          <div className="HomeScreen-footer-dummy">Investor Relations</div>
          <div className="HomeScreen-footer-dummy">Legal Notices</div>
          <div className="HomeScreen-footer-dummy">Help Centre</div>
          <div className="HomeScreen-footer-dummy">Jobs</div>
          <div className="HomeScreen-footer-dummy">Cookie Preferences</div>
          <div className="HomeScreen-footer-dummy">Gift Cards</div>
          <div className="HomeScreen-footer-dummy">Terms of Use</div>
          <div className="HomeScreen-footer-dummy">Corporate Information</div>
        </div>
      </div>

      <div className="HomeScreen-copyright">&#169; 2022</div>
    </>
  );
}

export default Footer;
