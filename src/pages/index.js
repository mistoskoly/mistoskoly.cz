import React from "react"
import callitschoolVideo from "../images/callitschool.mp4"
import callitschoolThumbnail from "../images/callitschool.png"
import { Link } from "gatsby"

const Index = () => {
  return (
    <>
      <video
        style={{
          objectFit: "cover",
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
        }}
        playsInline
        autoPlay
        muted
        loop
        poster={callitschoolThumbnail}
      >
        <source src={callitschoolVideo} type="video/mp4" />
      </video>
      <header
        style={{
          position: "relative",
          height: "100vh",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        můžeš odejít ze školy
      </header>

      <main
        style={{
          backgroundColor: "white",
          color: "black",
          position: "relative",
          padding: "1rem",
          minHeight: "100vh",
        }}
      >
        tady se dozvíš
        <section>
          <Link to="/proc">proč odejít ze školy</Link>
          <Link to="/jak">jak odejít ze školy</Link>
          <Link to="/venku">co dělat až budeš venku</Link>
          <Link to="/spolecne">jak na to společně</Link>
        </section>
      </main>
    </>
  )
}

export default Index
