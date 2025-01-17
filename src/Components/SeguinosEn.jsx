import React from "react";
import { Link } from "react-router-dom";
import "./SeguinosEn.css";

export const SeguinosEn = () => {
  return (
    <>
      <div className="seguinos_en d-flex align-items-center justify-content-center">
        <div className="col-11 d-flex justify-content-center">
          <div className="col d-flex justify-content-center">
            <div className="row align-items-center ">
              <h3 className="col-xss-12 col-sm-6 text-sm-end text-center">
                Seguinos en:
              </h3>
              <div className="col-xss-12  col-sm-6 d-flex justify-content-center">
                <div className="ps-4">
                  <Link to={"/"}>
                    <img src="/assets/iconos/Facebook.png" alt="fb" />
                  </Link>
                </div>
                <div className="ps-4">
                  <Link to={"/"}>
                    <img src="/assets/iconos/Instagram.png" alt="ig" />
                  </Link>
                </div>
                <div className="ps-4">
                  <Link to={"/"}>
                    <img src="/assets/iconos/X.png" alt="x" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
