#ifndef _NodeSdl_opengl_H_
#define _NodeSdl_opengl_H_

#include <napi.h>
#include <SDL.h>
#include <SDL2/SDL_opengl.h>

namespace Opengl{
	
	void ClearIndex(const Napi::CallbackInfo&);

	void ClearColor(const Napi::CallbackInfo&); //+

	void Clear(const Napi::CallbackInfo&); //+

	void IndexMask(const Napi::CallbackInfo&);

	void ColorMask(const Napi::CallbackInfo&);

	void AlphaFunc(const Napi::CallbackInfo&);

	void BlendFunc(const Napi::CallbackInfo&);

	void LogicOp(const Napi::CallbackInfo&);

	void CullFace(const Napi::CallbackInfo&);

	void FrontFace(const Napi::CallbackInfo&);

	void PointSize(const Napi::CallbackInfo&);

	void LineWidth(const Napi::CallbackInfo&);

	void LineStipple(const Napi::CallbackInfo&);

	void PolygonMode(const Napi::CallbackInfo&);

	void PolygonOffset(const Napi::CallbackInfo&);

	void PolygonStipple(const Napi::CallbackInfo&);

	void GetPolygonStipple(const Napi::CallbackInfo&);

	void EdgeFlag(const Napi::CallbackInfo&);

	void EdgeFlagv(const Napi::CallbackInfo&);

	void Scissor(const Napi::CallbackInfo&);

	void ClipPlane(const Napi::CallbackInfo&);

	void GetClipPlane(const Napi::CallbackInfo&);

	void DrawBuffer(const Napi::CallbackInfo&);

	void ReadBuffer(const Napi::CallbackInfo&);

	void Enable(const Napi::CallbackInfo&);

	void Disable(const Napi::CallbackInfo&);

	Napi::Value IsEnabled(const Napi::CallbackInfo&);

	void EnableClientState(const Napi::CallbackInfo&);  /* 1.1 */

	void DisableClientState(const Napi::CallbackInfo&);  /* 1.1 */


	void GetBooleanv(const Napi::CallbackInfo&);

	void GetDoublev(const Napi::CallbackInfo&);

	void GetFloatv(const Napi::CallbackInfo&);

	void GetIntegerv(const Napi::CallbackInfo&);


	void PushAttrib(const Napi::CallbackInfo&);

	void PopAttrib(const Napi::CallbackInfo&);


	void PushClientAttrib(const Napi::CallbackInfo&);  /* 1.1 */

	void PopClientAttrib(const Napi::CallbackInfo&);  /* 1.1 */


	Napi::Value RenderMode(const Napi::CallbackInfo&);

	// enum GetError(const Napi::CallbackInfo&);

	// const ubyte * GetString(const Napi::CallbackInfo&);

	void Finish(const Napi::CallbackInfo&);

	void Flush(const Napi::CallbackInfo&);

	void Hint(const Napi::CallbackInfo&);


/*
 * Depth Buffer
 */

	void ClearDepth(const Napi::CallbackInfo&);

	void DepthFunc(const Napi::CallbackInfo&);

	void DepthMask(const Napi::CallbackInfo&);

	void DepthRange(const Napi::CallbackInfo&);


/*
 * Accumulation Buffer
 */

	void ClearAccum(const Napi::CallbackInfo&);

	void Accum(const Napi::CallbackInfo&);


/*
 * Transformation
 */

	void MatrixMode(const Napi::CallbackInfo&);

	void Ortho(const Napi::CallbackInfo&);

	void Frustum(const Napi::CallbackInfo&);

	void Viewport(const Napi::CallbackInfo&);

	void PushMatrix(const Napi::CallbackInfo&);

	void PopMatrix(const Napi::CallbackInfo&);

	void LoadIdentity(const Napi::CallbackInfo&);

	void LoadMatrixd(const Napi::CallbackInfo&);
	void LoadMatrixf(const Napi::CallbackInfo&);

	void MultMatrixd(const Napi::CallbackInfo&);
	void MultMatrixf(const Napi::CallbackInfo&);

	void Rotated(const Napi::CallbackInfo&);
	void Rotatef(const Napi::CallbackInfo&);

	void Scaled(const Napi::CallbackInfo&);
	void Scalef(const Napi::CallbackInfo&);

	void Translated(const Napi::CallbackInfo&);
	void Translatef(const Napi::CallbackInfo&);

/*
 * Display Lists
 */

	Napi::Value IsList(const Napi::CallbackInfo&);

	void DeleteLists(const Napi::CallbackInfo&);

	Napi::Value GenLists(const Napi::CallbackInfo&);

	void NewList(const Napi::CallbackInfo&);

	void EndList(const Napi::CallbackInfo&);

	void CallList(const Napi::CallbackInfo&);

	void CallLists(const Napi::CallbackInfo&);

	void ListBase(const Napi::CallbackInfo&);


	/*
	 * Drawing Functions
	 */

	void Begin(const Napi::CallbackInfo&);

	void End(const Napi::CallbackInfo&);


	void Vertex2d(const Napi::CallbackInfo&);
	void Vertex2f(const Napi::CallbackInfo&);
	void Vertex2i(const Napi::CallbackInfo&);
	void Vertex2s(const Napi::CallbackInfo&);

	void Vertex3d(const Napi::CallbackInfo&);
	void Vertex3f(const Napi::CallbackInfo&);
	void Vertex3i(const Napi::CallbackInfo&);
	void Vertex3s(const Napi::CallbackInfo&);

	void Vertex4d(const Napi::CallbackInfo&);
	void Vertex4f(const Napi::CallbackInfo&);
	void Vertex4i(const Napi::CallbackInfo&);
	void Vertex4s(const Napi::CallbackInfo&);

	void Vertex2dv(const Napi::CallbackInfo&);
	void Vertex2fv(const Napi::CallbackInfo&);
	void Vertex2iv(const Napi::CallbackInfo&);
	void Vertex2sv(const Napi::CallbackInfo&);

	void Vertex3dv(const Napi::CallbackInfo&);
	void Vertex3fv(const Napi::CallbackInfo&);
	void Vertex3iv(const Napi::CallbackInfo&);
	void Vertex3sv(const Napi::CallbackInfo&);

	void Vertex4dv(const Napi::CallbackInfo&);
	void Vertex4fv(const Napi::CallbackInfo&);
	void Vertex4iv(const Napi::CallbackInfo&);
	void Vertex4sv(const Napi::CallbackInfo&);


	void Normal3b(const Napi::CallbackInfo&);
	void Normal3d(const Napi::CallbackInfo&);
	void Normal3f(const Napi::CallbackInfo&);
	void Normal3i(const Napi::CallbackInfo&);
	void Normal3s(const Napi::CallbackInfo&);

	void Normal3bv(const Napi::CallbackInfo&);
	void Normal3dv(const Napi::CallbackInfo&);
	void Normal3fv(const Napi::CallbackInfo&);
	void Normal3iv(const Napi::CallbackInfo&);
	void Normal3sv(const Napi::CallbackInfo&);


	void Indexd(const Napi::CallbackInfo&);
	void Indexf(const Napi::CallbackInfo&);
	void Indexi(const Napi::CallbackInfo&);
	void Indexs(const Napi::CallbackInfo&);
	void Indexub(const Napi::CallbackInfo&);  /* 1.1 */

	void Indexdv(const Napi::CallbackInfo&);
	void Indexfv(const Napi::CallbackInfo&);
	void Indexiv(const Napi::CallbackInfo&);
	void Indexsv(const Napi::CallbackInfo&);
	void Indexubv(const Napi::CallbackInfo&);  /* 1.1 */

	void Color3b(const Napi::CallbackInfo&);
	void Color3d(const Napi::CallbackInfo&);
	void Color3f(const Napi::CallbackInfo&);
	void Color3i(const Napi::CallbackInfo&);
	void Color3s(const Napi::CallbackInfo&);
	void Color3ub(const Napi::CallbackInfo&);
	void Color3ui(const Napi::CallbackInfo&);
	void Color3us(const Napi::CallbackInfo&);

	void Color4b(const Napi::CallbackInfo&);
	void Color4d(const Napi::CallbackInfo&);
	void Color4f(const Napi::CallbackInfo&);
	void Color4i(const Napi::CallbackInfo&);
	void Color4s(const Napi::CallbackInfo&);
	void Color4ub(const Napi::CallbackInfo&);
	void Color4ui(const Napi::CallbackInfo&);
	void Color4us(const Napi::CallbackInfo&);


	void Color3bv(const Napi::CallbackInfo&);
	void Color3dv(const Napi::CallbackInfo&);
	void Color3fv(const Napi::CallbackInfo&);
	void Color3iv(const Napi::CallbackInfo&);
	void Color3sv(const Napi::CallbackInfo&);
	void Color3ubv(const Napi::CallbackInfo&);
	void Color3uiv(const Napi::CallbackInfo&);
	void Color3usv(const Napi::CallbackInfo&);

	void Color4bv(const Napi::CallbackInfo&);
	void Color4dv(const Napi::CallbackInfo&);
	void Color4fv(const Napi::CallbackInfo&);
	void Color4iv(const Napi::CallbackInfo&);
	void Color4sv(const Napi::CallbackInfo&);
	void Color4ubv(const Napi::CallbackInfo&);
	void Color4uiv(const Napi::CallbackInfo&);
	void Color4usv(const Napi::CallbackInfo&);


	void TexCoord1d(const Napi::CallbackInfo&);
	void TexCoord1f(const Napi::CallbackInfo&);
	void TexCoord1i(const Napi::CallbackInfo&);
	void TexCoord1s(const Napi::CallbackInfo&);

	void TexCoord2d(const Napi::CallbackInfo&);
	void TexCoord2f(const Napi::CallbackInfo&);
	void TexCoord2i(const Napi::CallbackInfo&);
	void TexCoord2s(const Napi::CallbackInfo&);

	void TexCoord3d(const Napi::CallbackInfo&);
	void TexCoord3f(const Napi::CallbackInfo&);
	void TexCoord3i(const Napi::CallbackInfo&);
	void TexCoord3s(const Napi::CallbackInfo&);

	void TexCoord4d(const Napi::CallbackInfo&);
	void TexCoord4f(const Napi::CallbackInfo&);
	void TexCoord4i(const Napi::CallbackInfo&);
	void TexCoord4s(const Napi::CallbackInfo&);

	void TexCoord1dv(const Napi::CallbackInfo&);
	void TexCoord1fv(const Napi::CallbackInfo&);
	void TexCoord1iv(const Napi::CallbackInfo&);
	void TexCoord1sv(const Napi::CallbackInfo&);

	void TexCoord2dv(const Napi::CallbackInfo&);
	void TexCoord2fv(const Napi::CallbackInfo&);
	void TexCoord2iv(const Napi::CallbackInfo&);
	void TexCoord2sv(const Napi::CallbackInfo&);

	void TexCoord3dv(const Napi::CallbackInfo&);
	void TexCoord3fv(const Napi::CallbackInfo&);
	void TexCoord3iv(const Napi::CallbackInfo&);
	void TexCoord3sv(const Napi::CallbackInfo&);

	void TexCoord4dv(const Napi::CallbackInfo&);
	void TexCoord4fv(const Napi::CallbackInfo&);
	void TexCoord4iv(const Napi::CallbackInfo&);
	void TexCoord4sv(const Napi::CallbackInfo&);


	void RasterPos2d(const Napi::CallbackInfo&);
	void RasterPos2f(const Napi::CallbackInfo&);
	void RasterPos2i(const Napi::CallbackInfo&);
	void RasterPos2s(const Napi::CallbackInfo&);

	void RasterPos3d(const Napi::CallbackInfo&);
	void RasterPos3f(const Napi::CallbackInfo&);
	void RasterPos3i(const Napi::CallbackInfo&);
	void RasterPos3s(const Napi::CallbackInfo&);

	void RasterPos4d(const Napi::CallbackInfo&);
	void RasterPos4f(const Napi::CallbackInfo&);
	void RasterPos4i(const Napi::CallbackInfo&);
	void RasterPos4s(const Napi::CallbackInfo&);

	void RasterPos2dv(const Napi::CallbackInfo&);
	void RasterPos2fv(const Napi::CallbackInfo&);
	void RasterPos2iv(const Napi::CallbackInfo&);
	void RasterPos2sv(const Napi::CallbackInfo&);

	void RasterPos3dv(const Napi::CallbackInfo&);
	void RasterPos3fv(const Napi::CallbackInfo&);
	void RasterPos3iv(const Napi::CallbackInfo&);
	void RasterPos3sv(const Napi::CallbackInfo&);

	void RasterPos4dv(const Napi::CallbackInfo&);
	void RasterPos4fv(const Napi::CallbackInfo&);
	void RasterPos4iv(const Napi::CallbackInfo&);
	void RasterPos4sv(const Napi::CallbackInfo&);


	void Rectd(const Napi::CallbackInfo&);
	void Rectf(const Napi::CallbackInfo&);
	void Recti(const Napi::CallbackInfo&);
	void Rects(const Napi::CallbackInfo&);


	void Rectdv(const Napi::CallbackInfo&);
	void Rectfv(const Napi::CallbackInfo&);
	void Rectiv(const Napi::CallbackInfo&);
	void Rectsv(const Napi::CallbackInfo&);


	/*
	 * Vertex Arrays  (1.1)
	 */

	void VertexPointer(const Napi::CallbackInfo&);

	void NormalPointer(const Napi::CallbackInfo&);

	void ColorPointer(const Napi::CallbackInfo&);

	void IndexPointer(const Napi::CallbackInfo&);

	void TexCoordPointer(const Napi::CallbackInfo&);

	void EdgeFlagPointer(const Napi::CallbackInfo&);

	void GetPointerv(const Napi::CallbackInfo&);

	void ArrayElement(const Napi::CallbackInfo&);

	void DrawArrays(const Napi::CallbackInfo&);

	void DrawElements(const Napi::CallbackInfo&);

	void InterleavedArrays(const Napi::CallbackInfo&);

	/*
	 * Lighting
	 */

	void ShadeModel(const Napi::CallbackInfo&);

	void Lightf(const Napi::CallbackInfo&);
	void Lighti(const Napi::CallbackInfo&);
	void Lightfv(const Napi::CallbackInfo&);
	void Lightiv(const Napi::CallbackInfo&);

	void GetLightfv(const Napi::CallbackInfo&);
	void GetLightiv(const Napi::CallbackInfo&);

	void LightModelf(const Napi::CallbackInfo&);
	void LightModeli(const Napi::CallbackInfo&);
	void LightModelfv(const Napi::CallbackInfo&);
	void LightModeliv(const Napi::CallbackInfo&);

	void Materialf(const Napi::CallbackInfo&);
	void Materiali(const Napi::CallbackInfo&);
	void Materialfv(const Napi::CallbackInfo&);
	void Materialiv(const Napi::CallbackInfo&);

	void GetMaterialfv(const Napi::CallbackInfo&);
	void GetMaterialiv(const Napi::CallbackInfo&);

	void ColorMaterial(const Napi::CallbackInfo&);


	/*
	 * Raster functions
	 */

	void PixelZoom(const Napi::CallbackInfo&);

	void PixelStoref(const Napi::CallbackInfo&);
	void PixelStorei(const Napi::CallbackInfo&);

	void PixelTransferf(const Napi::CallbackInfo&);
	void PixelTransferi(const Napi::CallbackInfo&);

	void PixelMapfv(const Napi::CallbackInfo&);
	void PixelMapuiv(const Napi::CallbackInfo&);
	void PixelMapusv(const Napi::CallbackInfo&);

	void GetPixelMapfv(const Napi::CallbackInfo&);
	void GetPixelMapuiv(const Napi::CallbackInfo&);
	void GetPixelMapusv(const Napi::CallbackInfo&);

	void Bitmap(const Napi::CallbackInfo&);

	Napi::Value ReadPixels(const Napi::CallbackInfo&);

	void DrawPixels(const Napi::CallbackInfo&);

	void CopyPixels(const Napi::CallbackInfo&);

	/*
	 * Stenciling
	 */

	void StencilFunc(const Napi::CallbackInfo&);

	void StencilMask(const Napi::CallbackInfo&);

	void StencilOp(const Napi::CallbackInfo&);

	void ClearStencil(const Napi::CallbackInfo&);



	/*
	 * Texture mapping
	 */

	void TexGend(const Napi::CallbackInfo&);
	void TexGenf(const Napi::CallbackInfo&);
	void TexGeni(const Napi::CallbackInfo&);

	void TexGendv(const Napi::CallbackInfo&);
	void TexGenfv(const Napi::CallbackInfo&);
	void TexGeniv(const Napi::CallbackInfo&);

	void GetTexGendv(const Napi::CallbackInfo&);
	void GetTexGenfv(const Napi::CallbackInfo&);
	void GetTexGeniv(const Napi::CallbackInfo&);


	void TexEnvf(const Napi::CallbackInfo&);
	void TexEnvi(const Napi::CallbackInfo&);

	void TexEnvfv(const Napi::CallbackInfo&);
	void TexEnviv(const Napi::CallbackInfo&);

	void GetTexEnvfv(const Napi::CallbackInfo&);
	void GetTexEnviv(const Napi::CallbackInfo&);


	void TexParameterf(const Napi::CallbackInfo&);
	void TexParameteri(const Napi::CallbackInfo&);

	void TexParameterfv(const Napi::CallbackInfo&);
	void TexParameteriv(const Napi::CallbackInfo&);

	void GetTexParameterfv(const Napi::CallbackInfo&);
	void GetTexParameteriv(const Napi::CallbackInfo&);

	void GetTexLevelParameterfv(const Napi::CallbackInfo&);
	void GetTexLevelParameteriv(const Napi::CallbackInfo&);


	void TexImage1D(const Napi::CallbackInfo&);

	void TexImage2D(const Napi::CallbackInfo&);

	void GetTexImage(const Napi::CallbackInfo&);


	/* 1.1 functions */

	void GenTextures(const Napi::CallbackInfo&);

	void DeleteTextures(const Napi::CallbackInfo&);

	void BindTexture(const Napi::CallbackInfo&);

	void PrioritizeTextures(const Napi::CallbackInfo&);

	Napi::Value AreTexturesResident(const Napi::CallbackInfo&);

	Napi::Value IsTexture(const Napi::CallbackInfo&);


	void TexSubImage1D(const Napi::CallbackInfo&);


	void TexSubImage2D(const Napi::CallbackInfo&);


	void CopyTexImage1D(const Napi::CallbackInfo&);


	void CopyTexImage2D(const Napi::CallbackInfo&);


	void CopyTexSubImage1D(const Napi::CallbackInfo&);


	void CopyTexSubImage2D(const Napi::CallbackInfo&);


	/*
	 * Evaluators
	 */

	void Map1d(const Napi::CallbackInfo&);
	void Map1f(const Napi::CallbackInfo&);

	void Map2d(const Napi::CallbackInfo&);
	void Map2f(const Napi::CallbackInfo&);

	void GetMapdv(const Napi::CallbackInfo&);
	void GetMapfv(const Napi::CallbackInfo&);
	void GetMapiv(const Napi::CallbackInfo&);

	void EvalCoord1d(const Napi::CallbackInfo&);
	void EvalCoord1f(const Napi::CallbackInfo&);

	void EvalCoord1dv(const Napi::CallbackInfo&);
	void EvalCoord1fv(const Napi::CallbackInfo&);

	void EvalCoord2d(const Napi::CallbackInfo&);
	void EvalCoord2f(const Napi::CallbackInfo&);

	void EvalCoord2dv(const Napi::CallbackInfo&);
	void EvalCoord2fv(const Napi::CallbackInfo&);

	void MapGrid1d(const Napi::CallbackInfo&);
	void MapGrid1f(const Napi::CallbackInfo&);

	void MapGrid2d(const Napi::CallbackInfo&);
	void MapGrid2f(const Napi::CallbackInfo&);

	void EvalPoint1(const Napi::CallbackInfo&);

	void EvalPoint2(const Napi::CallbackInfo&);

	void EvalMesh1(const Napi::CallbackInfo&);

	void EvalMesh2(const Napi::CallbackInfo&);


	/*
	 * Fog
	 */

	void Fogf(const Napi::CallbackInfo&);

	void Fogi(const Napi::CallbackInfo&);

	void Fogfv(const Napi::CallbackInfo&);

	void Fogiv(const Napi::CallbackInfo&);


	/*
	 * Selection and Feedback
	 */

	void FeedbackBuffer(const Napi::CallbackInfo&);

	void PassThrough(const Napi::CallbackInfo&);

	void SelectBuffer(const Napi::CallbackInfo&);

	void InitNames(const Napi::CallbackInfo&);

	void LoadName(const Napi::CallbackInfo&);

	void PushName(const Napi::CallbackInfo&);

	void PopName(const Napi::CallbackInfo&);

	void BlendEquation(const Napi::CallbackInfo&);

	void BlendColor(const Napi::CallbackInfo&);

	void BlendEquationSeparateATI(const Napi::CallbackInfo&);

//////////////////
	void Init(Napi::Env&, Napi::Object&);
}

#endif //_NodeSdl_opengl_H_