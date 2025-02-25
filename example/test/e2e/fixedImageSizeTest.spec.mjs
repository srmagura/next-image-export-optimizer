import { test, expect } from "@playwright/test";

const widths = [16, 32, 48, 64, 96, 128, 256, 384];
const correctSrc = {
  16: [
    "http://localhost:8080/images/nextImageExportOptimizer/chris-zhang-Jq8-3Bmh1pQ-unsplash-opt-16.WEBP",
    "http://localhost:8080/images/nextImageExportOptimizer/chris-zhang-Jq8-3Bmh1pQ-unsplash-opt-32.WEBP",
  ],
  32: [
    "http://localhost:8080/images/nextImageExportOptimizer/chris-zhang-Jq8-3Bmh1pQ-unsplash-opt-32.WEBP",
    "http://localhost:8080/images/nextImageExportOptimizer/chris-zhang-Jq8-3Bmh1pQ-unsplash-opt-64.WEBP",
  ],
  48: [
    "http://localhost:8080/images/nextImageExportOptimizer/chris-zhang-Jq8-3Bmh1pQ-unsplash-opt-48.WEBP",
    "http://localhost:8080/images/nextImageExportOptimizer/chris-zhang-Jq8-3Bmh1pQ-unsplash-opt-96.WEBP",
  ],
  64: [
    "http://localhost:8080/images/nextImageExportOptimizer/chris-zhang-Jq8-3Bmh1pQ-unsplash-opt-64.WEBP",
    "http://localhost:8080/images/nextImageExportOptimizer/chris-zhang-Jq8-3Bmh1pQ-unsplash-opt-128.WEBP",
  ],
  96: [
    "http://localhost:8080/images/nextImageExportOptimizer/chris-zhang-Jq8-3Bmh1pQ-unsplash-opt-96.WEBP",
    "http://localhost:8080/images/nextImageExportOptimizer/chris-zhang-Jq8-3Bmh1pQ-unsplash-opt-256.WEBP",
  ],
  128: [
    "http://localhost:8080/images/nextImageExportOptimizer/chris-zhang-Jq8-3Bmh1pQ-unsplash-opt-128.WEBP",
    "http://localhost:8080/images/nextImageExportOptimizer/chris-zhang-Jq8-3Bmh1pQ-unsplash-opt-256.WEBP",
  ],
  256: [
    "http://localhost:8080/images/nextImageExportOptimizer/chris-zhang-Jq8-3Bmh1pQ-unsplash-opt-256.WEBP",
  ],
  384: [
    "http://localhost:8080/images/nextImageExportOptimizer/chris-zhang-Jq8-3Bmh1pQ-unsplash-opt-384.WEBP",
  ],
};

for (let index = 0; index < widths.length; index++) {
  const width = widths[index];

  test.describe(`Test fixed width: ${width}`, () => {
    test.use({
      viewport: { width: 1024, height: 1024 },
      deviceScaleFactor: 1,
    });
    test("should check the image size", async ({ page }) => {
      await page.goto("/fixedImage", {
        waitUntil: "networkidle",
      });

      await page.click("text=Next-Image-Export-Optimizer");

      const img = await page.locator(`#test_image_${width}`);
      await img.click();
      const testWidth = width;
      const image = await page.evaluate((testWidth) => {
        let img = document.getElementById(`test_image_${testWidth}`);
        return {
          src: img.src,
          currentSrc: img.currentSrc,
          naturalWidth: img.naturalWidth,
          width: img.width,
        };
      }, testWidth);

      expect(
        correctSrc[width.toString()].includes(image.currentSrc)
      ).toBeTruthy();
    });
  });
}
