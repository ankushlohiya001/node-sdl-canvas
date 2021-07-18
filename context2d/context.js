const Texture = require("./texture");
class SDLContext {
  constructor(renderer) {
    this.renderer = renderer;
    this.texture = null;
    this.srcRect = {
      x: 0,
      y: 0,
      w: 0,
      h: 0
    };
    this.destRect = {
      x: 0,
      y: 0,
      w: 0,
      h: 0
    };
    this.pixelRatio = 1;
  }

  renderFrame(pixels, width, height) {
    if (!this.texture) return;
    // const [wid, hei] = this.size;
    this.renderer.clear();
    this.texture.update(0, 0, width, height, pixels);
    this.srcRect.x = 0;
    this.srcRect.y = 0;
    this.srcRect.w = width;
    this.srcRect.h = height;
    this.destRect.x = 0;
    this.destRect.y = 0;
    this.destRect.w = width / this.pixelRatio;
    this.destRect.h = height / this.pixelRatio;
    this.renderer.copy(this.texture, this.srcRect, this.destRect);
    this.renderer.present();
  }

  destroy() {
    this.renderer.destroy();
  }

  set size(size) {
    if (this.texture) {
      this.texture.destroy(); // destroying texture cause crashes, so tmp fix.
    }
    this.renderer.size = [size[0], size[1]];
    this.texture = Texture.createDynamicTexture(this.renderer, size[0] * this.pixelRatio, size[1] * this.pixelRatio);
  }

  get size() {
    return this.renderer.size;
  }

}

module.exports = SDLContext;