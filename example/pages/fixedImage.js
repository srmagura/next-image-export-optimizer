import Head from "next/head";
import ExportedImage from "../localTestComponent/ExportedImage";
// import ExportedImage from "next-image-export-optimizer";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next-Image-Export-Optimizer</title>
        <meta
          name="description"
          content="Example of next-image-export-optimizer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Next-Image-Export-Optimizer</h1>
        <div
          style={{
            position: "relative",
            marginBottom: "3rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {[16, 32, 48, 64, 96, 128, 256, 384].map((size) => (
            <ExportedImage
              key={size}
              src="images/chris-zhang-Jq8-3Bmh1pQ-unsplash.jpg"
              layout="fixed"
              width={size}
              height={size}
              useWebp={process.env.nextImageExportOptimizer_storePicturesInWEBP}
              id={`test_image_${size}`}
              objectFit="cover"
              priority={true}
              alt={"test_image"}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
