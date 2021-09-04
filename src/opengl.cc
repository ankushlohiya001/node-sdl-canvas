#include "opengl.h"

void Opengl::ClearIndex(const Napi::CallbackInfo& info){
	float c = info[0].As<Napi::Number>();

	glClearIndex(c);
}

void Opengl::ClearColor(const Napi::CallbackInfo& info){
	float r, g, b, a;
	r = info[0].As<Napi::Number>();
	g = info[1].As<Napi::Number>();
	b = info[2].As<Napi::Number>();
	a = info[3].As<Napi::Number>();

	glClearColor(r, g, b, a);
}

void Opengl::Clear(const Napi::CallbackInfo& info){
	uint flag = info[0].As<Napi::Number>();

	glClear(flag);
}

void Opengl::IndexMask(const Napi::CallbackInfo& info){
	uint mask = info[0].As<Napi::Number>();

	glIndexMask(mask);
}

void Opengl::ColorMask(const Napi::CallbackInfo& info){
	uint r, g, b, a;
	r = info[0].As<Napi::Number>();
	g = info[1].As<Napi::Number>();
	b = info[2].As<Napi::Number>();
	a = info[3].As<Napi::Number>();

	glColorMask(r, g, b, a);
}

void Opengl::AlphaFunc(const Napi::CallbackInfo& info){
	uint func = info[0].As<Napi::Number>();
	float ref = info[1].As<Napi::Number>();

	 glAlphaFunc(func, ref);
}

void Opengl::BlendFunc(const Napi::CallbackInfo& info){
	uint sfactor = info[0].As<Napi::Number>(),
			 dfactor = info[1].As<Napi::Number>();

	 glBlendFunc(sfactor, dfactor);
}

void Opengl::LogicOp(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::CullFace(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::FrontFace(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::PointSize(const Napi::CallbackInfo& info){
	float size = info[0].As<Napi::Number>();

	glPointSize(size);
}

void Opengl::LineWidth(const Napi::CallbackInfo& info){
	float width = info[0].As<Napi::Number>();

	glLineWidth(width);
}

void Opengl::LineStipple(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::PolygonMode(const Napi::CallbackInfo& info){
	uint face, mode;
	face = info[0].As<Napi::Number>();
	mode = info[1].As<Napi::Number>();

	glPolygonMode(face, mode);
}

void Opengl::PolygonOffset(const Napi::CallbackInfo& info){
	float factor, units;
	factor = info[0].As<Napi::Number>();
	units = info[1].As<Napi::Number>();

	glPolygonOffset(factor, units);
}

void Opengl::PolygonStipple(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::GetPolygonStipple(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::EdgeFlag(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::EdgeFlagv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::Scissor(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::ClipPlane(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::GetClipPlane(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::DrawBuffer(const Napi::CallbackInfo& info){
	uint mode = info[0].As<Napi::Number>();

	glDrawBuffer(mode);
}

void Opengl::ReadBuffer(const Napi::CallbackInfo& info){
	uint mode = info[0].As<Napi::Number>();

	glReadBuffer(mode);
}

void Opengl::Enable(const Napi::CallbackInfo& info){
	uint cap = info[0].As<Napi::Number>();

	glEnable(cap);
}

void Opengl::Disable(const Napi::CallbackInfo& info){
	uint cap = info[0].As<Napi::Number>();

	glDisable(cap);
}

Napi::Value Opengl::IsEnabled(const Napi::CallbackInfo& info){
	//yet to implement !!
	return info.Env().Undefined();
}

void Opengl::EnableClientState(const Napi::CallbackInfo& info){
	//yet to implement !!
}  /* 1.1 */

void Opengl::DisableClientState(const Napi::CallbackInfo& info){
	//yet to implement !!
}  /* 1.1 */


void Opengl::GetBooleanv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::GetDoublev(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::GetFloatv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::GetIntegerv(const Napi::CallbackInfo& info){
	//yet to implement !!
}


void Opengl::PushAttrib(const Napi::CallbackInfo& info){
	uint mask = info[0].As<Napi::Number>();

	glPushAttrib(mask);
}

void Opengl::PopAttrib(const Napi::CallbackInfo& info){
	
	glPopAttrib();
}


void Opengl::PushClientAttrib(const Napi::CallbackInfo& info){
	uint mask = info[0].As<Napi::Number>();

	glPushClientAttrib(mask);
}  /* 1.1 */

void Opengl::PopClientAttrib(const Napi::CallbackInfo& info){

	glPopClientAttrib();
}  /* 1.1 */


Napi::Value Opengl::RenderMode(const Napi::CallbackInfo& info){
	uint mode = info[0].As<Napi::Number>();

	return Napi::Number::New(info.Env(), glRenderMode(mode));
}

	// enum GetError(const Napi::CallbackInfo& info){
	//yet to implement !!
//}

	// const ubyte * GetString(const Napi::CallbackInfo& info){
	//yet to implement !!
//}

void Opengl::Finish(const Napi::CallbackInfo& info){
	
	glFinish();
}

void Opengl::Flush(const Napi::CallbackInfo& info){

	glFlush();
}

void Opengl::Hint(const Napi::CallbackInfo& info){
	uint target = info[0].As<Napi::Number>();
	uint mode = info[1].As<Napi::Number>();

	glHint(target, mode);
}


/*
 * Depth Buffer
 */

void Opengl::ClearDepth(const Napi::CallbackInfo& info){
	double depth = info[0].As<Napi::Number>();

	glClearDepth(depth);
}

void Opengl::DepthFunc(const Napi::CallbackInfo& info){
	uint func = info[0].As<Napi::Number>();

	glDepthFunc(func);
}

void Opengl::DepthMask(const Napi::CallbackInfo& info){
	uint mask = info[0].As<Napi::Number>();

	glDepthMask(mask);
}

void Opengl::DepthRange(const Napi::CallbackInfo& info){
	double near_val = info[0].As<Napi::Number>();
	double far_val = info[1].As<Napi::Number>();

	glDepthRange(near_val, far_val);
}


/*
 * Accumulation Buffer
 */

void Opengl::ClearAccum(const Napi::CallbackInfo& info){	
	float red = info[0].As<Napi::Number>(),
				green = info[1].As<Napi::Number>(),
				blue = info[2].As<Napi::Number>(),
				alpha = info[3].As<Napi::Number>();

	glClearAccum(red, green, blue, alpha);
}

void Opengl::Accum(const Napi::CallbackInfo& info){
	uint op = info[0].As<Napi::Number>();
	float value = info[1].As<Napi::Number>();	
	glAccum(op, value);
}


/*
 * Transformation
 */

void Opengl::MatrixMode(const Napi::CallbackInfo& info){
	uint mod = info[0].As<Napi::Number>();
	
	glMatrixMode(mod);
}

void Opengl::Ortho(const Napi::CallbackInfo& info){
	double left = info[0].As<Napi::Number>(),
				 right = info[1].As<Napi::Number>(),
				 bottom = info[2].As<Napi::Number>(),
				 top = info[3].As<Napi::Number>(),
				 near_val = info[4].As<Napi::Number>(),
				 far_val = info[5].As<Napi::Number>();

	glOrtho(left, right, bottom, top, near_val, far_val);
}

void Opengl::Frustum(const Napi::CallbackInfo& info){
	double left = info[0].As<Napi::Number>(),
				 right = info[1].As<Napi::Number>(),
				 bottom = info[2].As<Napi::Number>(),
				 top = info[3].As<Napi::Number>(),
				 near_val = info[4].As<Napi::Number>(),
				 far_val = info[5].As<Napi::Number>();

	glFrustum(left, right, bottom, top, near_val, far_val);
}

void Opengl::Viewport(const Napi::CallbackInfo& info){
	double x = info[0].As<Napi::Number>(),
				 y = info[1].As<Napi::Number>(),
				 width = info[2].As<Napi::Number>(),
				 height = info[3].As<Napi::Number>();

	glViewport(x, y, width, height);
}

void Opengl::PushMatrix(const Napi::CallbackInfo& info){
	
	glPushMatrix();
}

void Opengl::PopMatrix(const Napi::CallbackInfo& info){

	glPopMatrix();
}

void Opengl::LoadIdentity(const Napi::CallbackInfo& info){

	glLoadIdentity();
}

void Opengl::LoadMatrixd(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::LoadMatrixf(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::MultMatrixd(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::MultMatrixf(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::Rotated(const Napi::CallbackInfo& info){
	double ang, x, y, z;
	ang = info[0].As<Napi::Number>();
	x = info[1].As<Napi::Number>();
	y = info[2].As<Napi::Number>();
	z = info[3].As<Napi::Number>();

	glRotated(ang, x, y, z);
}

void Opengl::Rotatef(const Napi::CallbackInfo& info){
	float ang, x, y, z;
	ang = info[0].As<Napi::Number>();
	x = info[1].As<Napi::Number>();
	y = info[2].As<Napi::Number>();
	z = info[3].As<Napi::Number>();

	glRotatef(ang, x, y, z);
}

void Opengl::Scaled(const Napi::CallbackInfo& info){
	double x, y, z;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();
	z = info[2].As<Napi::Number>();

	glScaled(x, y, z);
}

void Opengl::Scalef(const Napi::CallbackInfo& info){
	float x, y, z;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();
	z = info[2].As<Napi::Number>();

	glScalef(x, y, z);
}

void Opengl::Translated(const Napi::CallbackInfo& info){
	double x, y, z;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();
	z = info[2].As<Napi::Number>();

	glTranslated(x, y, z);
}

void Opengl::Translatef(const Napi::CallbackInfo& info){
	float x, y, z;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();
	z = info[2].As<Napi::Number>();

	glTranslatef(x, y, z);
}

/*
 * Display Lists
 */

Napi::Value Opengl::IsList(const Napi::CallbackInfo& info){
	//yet to implement !!
	return info.Env().Undefined();
}

void Opengl::DeleteLists(const Napi::CallbackInfo& info){
	//yet to implement !!
}

Napi::Value Opengl::GenLists(const Napi::CallbackInfo& info){
	//yet to implement !!
	return info.Env().Undefined();
}

void Opengl::NewList(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::EndList(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::CallList(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::CallLists(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::ListBase(const Napi::CallbackInfo& info){
	//yet to implement !!
}


	/*
	 * Drawing Functions
	 */

void Opengl::Begin(const Napi::CallbackInfo& info){
	uint flag = info[0].As<Napi::Number>();

	glBegin(flag);
}

void Opengl::End(const Napi::CallbackInfo& info){
	
	glEnd();
}

void Opengl::Vertex2d(const Napi::CallbackInfo& info){
	double x, y;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();

	glVertex2d(x, y);
}
void Opengl::Vertex2f(const Napi::CallbackInfo& info){
	float x, y;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();

	glVertex2f(x, y);
}
void Opengl::Vertex2i(const Napi::CallbackInfo& info){
	int x, y;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();

	glVertex2i(x, y);
}
void Opengl::Vertex2s(const Napi::CallbackInfo& info){
	int x, y;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();

	glVertex2s(x, y);
}

void Opengl::Vertex3d(const Napi::CallbackInfo& info){
	double x, y, z;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();
	z = info[2].As<Napi::Number>();

	glVertex3d(x, y, z);
}

void Opengl::Vertex3f(const Napi::CallbackInfo& info){
	float x, y, z;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();
	z = info[2].As<Napi::Number>();

	glVertex3f(x, y, z);
}

void Opengl::Vertex3i(const Napi::CallbackInfo& info){
	int x, y, z;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();
	z = info[2].As<Napi::Number>();

	glVertex3i(x, y, z);
}

void Opengl::Vertex3s(const Napi::CallbackInfo& info){
	int x, y, z;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();
	z = info[2].As<Napi::Number>();

	glVertex3s(x, y, z);
}

void Opengl::Vertex4d(const Napi::CallbackInfo& info){
	double x, y, z, w;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();
	z = info[2].As<Napi::Number>();
	w = info[3].As<Napi::Number>();

	glVertex4d(x, y, z, w);
}

void Opengl::Vertex4f(const Napi::CallbackInfo& info){
	float x, y, z, w;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();
	z = info[2].As<Napi::Number>();
	w = info[3].As<Napi::Number>();

	glVertex4f(x, y, z, w);
}

void Opengl::Vertex4i(const Napi::CallbackInfo& info){
	int x, y, z, w;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();
	z = info[2].As<Napi::Number>();
	w = info[3].As<Napi::Number>();

	glVertex4i(x, y, z, w);
}

void Opengl::Vertex4s(const Napi::CallbackInfo& info){
	int x, y, z, w;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();
	z = info[2].As<Napi::Number>();
	w = info[3].As<Napi::Number>();

	glVertex4s(x, y, z, w);
}

void Opengl::Vertex2dv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Vertex2fv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Vertex2iv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Vertex2sv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::Vertex3dv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Vertex3fv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Vertex3iv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Vertex3sv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::Vertex4dv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Vertex4fv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Vertex4iv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Vertex4sv(const Napi::CallbackInfo& info){
	//yet to implement !!
}


void Opengl::Normal3b(const Napi::CallbackInfo& info){
	int nx, ny, nz;
	nx = info[0].As<Napi::Number>();
	ny = info[1].As<Napi::Number>();
	nz = info[2].As<Napi::Number>();

	glNormal3b(nx, ny, nz);
}

void Opengl::Normal3d(const Napi::CallbackInfo& info){
	double nx, ny, nz;
	nx = info[0].As<Napi::Number>();
	ny = info[1].As<Napi::Number>();
	nz = info[2].As<Napi::Number>();

	glNormal3d(nx, ny, nz);
}

void Opengl::Normal3f(const Napi::CallbackInfo& info){
	float nx, ny, nz;
	nx = info[0].As<Napi::Number>();
	ny = info[1].As<Napi::Number>();
	nz = info[2].As<Napi::Number>();

	glNormal3f(nx, ny, nz);
}

void Opengl::Normal3i(const Napi::CallbackInfo& info){
	int nx, ny, nz;
	nx = info[0].As<Napi::Number>();
	ny = info[1].As<Napi::Number>();
	nz = info[2].As<Napi::Number>();

	glNormal3i(nx, ny, nz);
}

void Opengl::Normal3s(const Napi::CallbackInfo& info){
	int nx, ny, nz;
	nx = info[0].As<Napi::Number>();
	ny = info[1].As<Napi::Number>();
	nz = info[2].As<Napi::Number>();

	glNormal3s(nx, ny, nz);
}

void Opengl::Normal3bv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Normal3dv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Normal3fv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Normal3iv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Normal3sv(const Napi::CallbackInfo& info){
	//yet to implement !!
}


void Opengl::Indexd(const Napi::CallbackInfo& info){
	double c = info[0].As<Napi::Number>();

	glIndexd(c);
}

void Opengl::Indexf(const Napi::CallbackInfo& info){
	float c = info[0].As<Napi::Number>();

	glIndexf(c);
}

void Opengl::Indexi(const Napi::CallbackInfo& info){
	int c = info[0].As<Napi::Number>();

	glIndexi(c);
}

void Opengl::Indexs(const Napi::CallbackInfo& info){
	int c = info[0].As<Napi::Number>();

	glIndexs(c);
}

void Opengl::Indexub(const Napi::CallbackInfo& info){
	uint c = info[0].As<Napi::Number>();

	glIndexub(c);
}  /* 1.1 */

void Opengl::Indexdv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Indexfv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::Indexiv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::Indexsv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::Indexubv(const Napi::CallbackInfo& info){
	//yet to implement !!
}  /* 1.1 */

void Opengl::Color3b(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::Color3d(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::Color3f(const Napi::CallbackInfo& info){
	float r, g, b;
	r = info[0].As<Napi::Number>();
	g = info[1].As<Napi::Number>();
	b = info[2].As<Napi::Number>();

	glColor3f(r, g, b);
}

void Opengl::Color3i(const Napi::CallbackInfo& info){
	int r, g, b;
	r = info[0].As<Napi::Number>();
	g = info[1].As<Napi::Number>();
	b = info[2].As<Napi::Number>();

	glColor3i(r, g, b);
}

void Opengl::Color3s(const Napi::CallbackInfo& info){
	int r, g, b;
	r = info[0].As<Napi::Number>();
	g = info[1].As<Napi::Number>();
	b = info[2].As<Napi::Number>();

	glColor3s(r, g, b);
}

void Opengl::Color3ub(const Napi::CallbackInfo& info){
	uint r, g, b;
	r = info[0].As<Napi::Number>();
	g = info[1].As<Napi::Number>();
	b = info[2].As<Napi::Number>();

	glColor3ub(r, g, b);
}

void Opengl::Color3ui(const Napi::CallbackInfo& info){
	uint r, g, b;
	r = info[0].As<Napi::Number>();
	g = info[1].As<Napi::Number>();
	b = info[2].As<Napi::Number>();

	glColor3ui(r, g, b);
}

void Opengl::Color3us(const Napi::CallbackInfo& info){
	uint r, g, b;
	r = info[0].As<Napi::Number>();
	g = info[1].As<Napi::Number>();
	b = info[2].As<Napi::Number>();

	glColor3us(r, g, b);
}

void Opengl::Color4b(const Napi::CallbackInfo& info){
	int r, g, b, a;
	r = info[0].As<Napi::Number>();
	g = info[1].As<Napi::Number>();
	b = info[2].As<Napi::Number>();
	a = info[3].As<Napi::Number>();

	glColor4b(r, g, b, a);
}

void Opengl::Color4d(const Napi::CallbackInfo& info){
	double r, g, b, a;
	r = info[0].As<Napi::Number>();
	g = info[1].As<Napi::Number>();
	b = info[2].As<Napi::Number>();
	a = info[3].As<Napi::Number>();

	glColor4d(r, g, b, a);
}

void Opengl::Color4f(const Napi::CallbackInfo& info){
	float r, g, b, a;
	r = info[0].As<Napi::Number>();
	g = info[1].As<Napi::Number>();
	b = info[2].As<Napi::Number>();
	a = info[3].As<Napi::Number>();

	glColor4f(r, g, b, a);
}

void Opengl::Color4i(const Napi::CallbackInfo& info){
	int r, g, b, a;
	r = info[0].As<Napi::Number>();
	g = info[1].As<Napi::Number>();
	b = info[2].As<Napi::Number>();
	a = info[3].As<Napi::Number>();

	glColor4i(r, g, b, a);
}

void Opengl::Color4s(const Napi::CallbackInfo& info){
	int r, g, b, a;
	r = info[0].As<Napi::Number>();
	g = info[1].As<Napi::Number>();
	b = info[2].As<Napi::Number>();
	a = info[3].As<Napi::Number>();

	glColor4s(r, g, b, a);
}

void Opengl::Color4ub(const Napi::CallbackInfo& info){
	uint r, g, b, a;
	r = info[0].As<Napi::Number>();
	g = info[1].As<Napi::Number>();
	b = info[2].As<Napi::Number>();
	a = info[3].As<Napi::Number>();

	glColor4ub(r, g, b, a);
}

void Opengl::Color4ui(const Napi::CallbackInfo& info){
	uint r, g, b, a;
	r = info[0].As<Napi::Number>();
	g = info[1].As<Napi::Number>();
	b = info[2].As<Napi::Number>();
	a = info[3].As<Napi::Number>();

	glColor4ui(r, g, b, a);
}

void Opengl::Color4us(const Napi::CallbackInfo& info){
	uint r, g, b, a;
	r = info[0].As<Napi::Number>();
	g = info[1].As<Napi::Number>();
	b = info[2].As<Napi::Number>();
	a = info[3].As<Napi::Number>();

	glColor4us(r, g, b, a);
}


void Opengl::Color3bv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Color3dv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Color3fv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Color3iv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Color3sv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Color3ubv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Color3uiv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Color3usv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::Color4bv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Color4dv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Color4fv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Color4iv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Color4sv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Color4ubv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Color4uiv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Color4usv(const Napi::CallbackInfo& info){
	//yet to implement !!
}


void Opengl::TexCoord1d(const Napi::CallbackInfo& info){
	double s = info[0].As<Napi::Number>();

	glTexCoord1d(s);
}

void Opengl::TexCoord1f(const Napi::CallbackInfo& info){
	float s = info[0].As<Napi::Number>();

	glTexCoord1f(s);
}

void Opengl::TexCoord1i(const Napi::CallbackInfo& info){
	int s = info[0].As<Napi::Number>();

	glTexCoord1i(s);
}
void Opengl::TexCoord1s(const Napi::CallbackInfo& info){
	int s = info[0].As<Napi::Number>();

	glTexCoord1s(s);
}

void Opengl::TexCoord2d(const Napi::CallbackInfo& info){
	double s = info[0].As<Napi::Number>();
	double t = info[1].As<Napi::Number>();

	glTexCoord2d(s, t);
}

void Opengl::TexCoord2f(const Napi::CallbackInfo& info){
	float s = info[0].As<Napi::Number>();
	float t = info[1].As<Napi::Number>();

	glTexCoord2f(s, t);
}

void Opengl::TexCoord2i(const Napi::CallbackInfo& info){
	int s = info[0].As<Napi::Number>();
	int t = info[1].As<Napi::Number>();

	glTexCoord2i(s, t);
}

void Opengl::TexCoord2s(const Napi::CallbackInfo& info){
	int s = info[0].As<Napi::Number>();
	int t = info[1].As<Napi::Number>();

	glTexCoord2d(s, t);
}

void Opengl::TexCoord3d(const Napi::CallbackInfo& info){
	double s = info[0].As<Napi::Number>();
	double t = info[1].As<Napi::Number>();
	double r = info[2].As<Napi::Number>();

	glTexCoord3d(s, t, r);
}

void Opengl::TexCoord3f(const Napi::CallbackInfo& info){
	float s = info[0].As<Napi::Number>();
	float t = info[1].As<Napi::Number>();
	float r = info[2].As<Napi::Number>();

	glTexCoord3f(s, t, r);
}

void Opengl::TexCoord3i(const Napi::CallbackInfo& info){
	int s = info[0].As<Napi::Number>();
	int t = info[1].As<Napi::Number>();
	int r = info[2].As<Napi::Number>();

	glTexCoord3i(s, t, r);
}

void Opengl::TexCoord3s(const Napi::CallbackInfo& info){
	int s = info[0].As<Napi::Number>();
	int t = info[1].As<Napi::Number>();
	int r = info[2].As<Napi::Number>();

	glTexCoord3s(s, t, r);
}


void Opengl::TexCoord4d(const Napi::CallbackInfo& info){
	double s = info[0].As<Napi::Number>();
	double t = info[1].As<Napi::Number>();
	double r = info[2].As<Napi::Number>();
	double q = info[3].As<Napi::Number>();

	glTexCoord4d(s, t, r, q);
}

void Opengl::TexCoord4f(const Napi::CallbackInfo& info){
	float s = info[0].As<Napi::Number>();
	float t = info[1].As<Napi::Number>();
	float r = info[2].As<Napi::Number>();
	float q = info[3].As<Napi::Number>();

	glTexCoord4f(s, t, r, q);
}

void Opengl::TexCoord4i(const Napi::CallbackInfo& info){
	int s = info[0].As<Napi::Number>();
	int t = info[1].As<Napi::Number>();
	int r = info[2].As<Napi::Number>();
	int q = info[3].As<Napi::Number>();

	glTexCoord4i(s, t, r, q);
}
void Opengl::TexCoord4s(const Napi::CallbackInfo& info){
	int s = info[0].As<Napi::Number>();
	int t = info[1].As<Napi::Number>();
	int r = info[2].As<Napi::Number>();
	int q = info[3].As<Napi::Number>();

	glTexCoord4s(s, t, r, q);
}

void Opengl::TexCoord1dv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::TexCoord1fv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::TexCoord1iv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::TexCoord1sv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::TexCoord2dv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::TexCoord2fv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::TexCoord2iv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::TexCoord2sv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::TexCoord3dv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::TexCoord3fv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::TexCoord3iv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::TexCoord3sv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::TexCoord4dv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::TexCoord4fv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::TexCoord4iv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::TexCoord4sv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::RasterPos2d(const Napi::CallbackInfo& info){
	double x, y;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();

	glRasterPos2d(x, y);
}

void Opengl::RasterPos2f(const Napi::CallbackInfo& info){
	float x, y;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();

	glRasterPos2f(x, y);
}

void Opengl::RasterPos2i(const Napi::CallbackInfo& info){
	int x, y;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();

	glRasterPos2i(x, y);
}

void Opengl::RasterPos2s(const Napi::CallbackInfo& info){
	int x, y;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();

	glRasterPos2s(x, y);
}

void Opengl::RasterPos3d(const Napi::CallbackInfo& info){
	double x, y, z;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();
	z = info[2].As<Napi::Number>();

	glRasterPos3d(x, y, z);
}

void Opengl::RasterPos3f(const Napi::CallbackInfo& info){
	float x, y, z;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();
	z = info[2].As<Napi::Number>();

	glRasterPos3f(x, y, z);
}

void Opengl::RasterPos3i(const Napi::CallbackInfo& info){
	int x, y, z;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();
	z = info[2].As<Napi::Number>();

	glRasterPos3i(x, y, z);
}

void Opengl::RasterPos3s(const Napi::CallbackInfo& info){
	int x, y, z;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();
	z = info[2].As<Napi::Number>();

	glRasterPos3s(x, y, z);
}

void Opengl::RasterPos4d(const Napi::CallbackInfo& info){
	double x, y, z, w;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();
	z = info[2].As<Napi::Number>();
	w = info[3].As<Napi::Number>();

	glRasterPos4d(x, y, z, w);
}

void Opengl::RasterPos4f(const Napi::CallbackInfo& info){
	float x, y, z, w;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();
	z = info[2].As<Napi::Number>();
	w = info[3].As<Napi::Number>();

	glRasterPos4f(x, y, z, w);
}

void Opengl::RasterPos4i(const Napi::CallbackInfo& info){
	int x, y, z, w;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();
	z = info[2].As<Napi::Number>();
	w = info[3].As<Napi::Number>();

	glRasterPos4i(x, y, z, w);
}

void Opengl::RasterPos4s(const Napi::CallbackInfo& info){
	int x, y, z, w;
	x = info[0].As<Napi::Number>();
	y = info[1].As<Napi::Number>();
	z = info[2].As<Napi::Number>();
	w = info[3].As<Napi::Number>();

	glRasterPos4s(x, y, z, w);
}

void Opengl::RasterPos2dv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::RasterPos2fv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::RasterPos2iv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::RasterPos2sv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::RasterPos3dv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::RasterPos3fv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::RasterPos3iv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::RasterPos3sv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::RasterPos4dv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::RasterPos4fv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::RasterPos4iv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::RasterPos4sv(const Napi::CallbackInfo& info){
	//yet to implement !!
}


void Opengl::Rectd(const Napi::CallbackInfo& info){
	double x1 = info[0].As<Napi::Number>();
	double y1 = info[1].As<Napi::Number>();
	double x2 = info[2].As<Napi::Number>();
	double y2 = info[3].As<Napi::Number>();

	glRectd(x1, y1, x2, y2);
}

void Opengl::Rectf(const Napi::CallbackInfo& info){
	float x1 = info[0].As<Napi::Number>();
	float y1 = info[1].As<Napi::Number>();
	float x2 = info[2].As<Napi::Number>();
	float y2 = info[3].As<Napi::Number>();

	glRectf(x1, y1, x2, y2);
}

void Opengl::Recti(const Napi::CallbackInfo& info){
	int x1 = info[0].As<Napi::Number>();
	int y1 = info[1].As<Napi::Number>();
	int x2 = info[2].As<Napi::Number>();
	int y2 = info[3].As<Napi::Number>();

	glRecti(x1, y1, x2, y2);
}

void Opengl::Rects(const Napi::CallbackInfo& info){
	int x1 = info[0].As<Napi::Number>();
	int y1 = info[1].As<Napi::Number>();
	int x2 = info[2].As<Napi::Number>();
	int y2 = info[3].As<Napi::Number>();

	glRects(x1, y1, x2, y2);
}

void Opengl::Rectdv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Rectfv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Rectiv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Rectsv(const Napi::CallbackInfo& info){
	//yet to implement !!
}


	/*
	 * Vertex Arrays  (1.1)
	 */

void Opengl::VertexPointer(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::NormalPointer(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::ColorPointer(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::IndexPointer(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::TexCoordPointer(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::EdgeFlagPointer(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::GetPointerv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::ArrayElement(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::DrawArrays(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::DrawElements(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::InterleavedArrays(const Napi::CallbackInfo& info){
	//yet to implement !!
}

	/*
	 * Lighting
	 */

void Opengl::ShadeModel(const Napi::CallbackInfo& info){
	uint mode = info[0].As<Napi::Number>();

	glShadeModel(mode);
}

void Opengl::Lightf(const Napi::CallbackInfo& info){
	uint light = info[0].As<Napi::Number>();
	uint pname = info[1].As<Napi::Number>();
	float param = info[2].As<Napi::Number>();

	glLightf(light, pname, param);
}

void Opengl::Lighti(const Napi::CallbackInfo& info){
	uint light = info[0].As<Napi::Number>();
	uint pname = info[1].As<Napi::Number>();
	int param = info[2].As<Napi::Number>();

	glLightf(light, pname, param);
}

void Opengl::Lightfv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::Lightiv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::GetLightfv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::GetLightiv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::LightModelf(const Napi::CallbackInfo& info){
	uint pname = info[0].As<Napi::Number>();
	float param = info[1].As<Napi::Number>();

	glLightModelf(pname, param);
}

void Opengl::LightModeli(const Napi::CallbackInfo& info){
	uint pname = info[0].As<Napi::Number>();
	int param = info[1].As<Napi::Number>();

	glLightModeli(pname, param);
}

void Opengl::LightModelfv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::LightModeliv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::Materialf(const Napi::CallbackInfo& info){
	uint face = info[0].As<Napi::Number>();
	uint pname = info[1].As<Napi::Number>();
	float param = info[2].As<Napi::Number>();

	glMaterialf(face, pname, param);
}

void Opengl::Materiali(const Napi::CallbackInfo& info){
	uint face = info[0].As<Napi::Number>();
	uint pname = info[1].As<Napi::Number>();
	int param = info[2].As<Napi::Number>();

	glMateriali(face, pname, param);
}

void Opengl::Materialfv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Materialiv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::GetMaterialfv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::GetMaterialiv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::ColorMaterial(const Napi::CallbackInfo& info){
	uint face = info[0].As<Napi::Number>();
	uint mode = info[1].As<Napi::Number>();

	glColorMaterial(face, mode);
}


	/*
	 * Raster functions
	 */

void Opengl::PixelZoom(const Napi::CallbackInfo& info){
	float xfactor = info[0].As<Napi::Number>();
	float yfactor = info[1].As<Napi::Number>();

	glPixelZoom(xfactor, yfactor);
}

void Opengl::PixelStoref(const Napi::CallbackInfo& info){
	float pname = info[0].As<Napi::Number>();
	float param = info[1].As<Napi::Number>();

	glPixelStoref(pname, param);
}

void Opengl::PixelStorei(const Napi::CallbackInfo& info){
	int pname = info[0].As<Napi::Number>();
	int param = info[1].As<Napi::Number>();

	glPixelStorei(pname, param);
}


void Opengl::PixelTransferf(const Napi::CallbackInfo& info){
	float pname = info[0].As<Napi::Number>();
	float param = info[1].As<Napi::Number>();

	glPixelTransferf(pname, param);
}

void Opengl::PixelTransferi(const Napi::CallbackInfo& info){
	int pname = info[0].As<Napi::Number>();
	int param = info[1].As<Napi::Number>();

	glPixelTransferi(pname, param);
}

void Opengl::PixelMapfv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::PixelMapuiv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::PixelMapusv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::GetPixelMapfv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::GetPixelMapuiv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::GetPixelMapusv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::Bitmap(const Napi::CallbackInfo& info){
	//yet to implement !!
}

Napi::Value Opengl::ReadPixels(const Napi::CallbackInfo& info){
	int x = info[0].As<Napi::Number>();
	int y = info[1].As<Napi::Number>();
	int width = info[2].As<Napi::Number>();
	int height = info[3].As<Napi::Number>();
	uint format = info[4].As<Napi::Number>();
	uint type = info[5].As<Napi::Number>();

	uint* pixels = new uint[width*height*4];

	glReadPixels(x, y, width, height, format, type, pixels);

	Napi::Buffer<uint*> buf = Napi::Buffer<uint*>::New(info.Env(), *pixels);

	delete pixels;

	return buf;
}

void Opengl::DrawPixels(const Napi::CallbackInfo& info){
	int width = info[0].As<Napi::Number>();
	int height = info[1].As<Napi::Number>();
	uint format = info[2].As<Napi::Number>();
	uint type = info[3].As<Napi::Number>();	

	uint* pixels = {};

	Napi::Buffer<uint*> buf = info[4].As<Napi::Buffer<uint*>>();
	pixels = reinterpret_cast<uint*>(buf.Data());

	glDrawPixels(width, height, format, type, pixels);
}

void Opengl::CopyPixels(const Napi::CallbackInfo& info){
	//yet to implement !!
}

	/*
	 * Stenciling
	 */

void Opengl::StencilFunc(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::StencilMask(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::StencilOp(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::ClearStencil(const Napi::CallbackInfo& info){
	//yet to implement !!
}



	/*
	 * Texture mapping
	 */

void Opengl::TexGend(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::TexGenf(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::TexGeni(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::TexGendv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::TexGenfv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::TexGeniv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::GetTexGendv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::GetTexGenfv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::GetTexGeniv(const Napi::CallbackInfo& info){
	//yet to implement !!
}


void Opengl::TexEnvf(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::TexEnvi(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::TexEnvfv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::TexEnviv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::GetTexEnvfv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::GetTexEnviv(const Napi::CallbackInfo& info){
	//yet to implement !!
}


void Opengl::TexParameterf(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::TexParameteri(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::TexParameterfv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::TexParameteriv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::GetTexParameterfv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::GetTexParameteriv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::GetTexLevelParameterfv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::GetTexLevelParameteriv(const Napi::CallbackInfo& info){
	//yet to implement !!
}


void Opengl::TexImage1D(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::TexImage2D(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::GetTexImage(const Napi::CallbackInfo& info){
	//yet to implement !!
}


	/* 1.1 functions */

void Opengl::GenTextures(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::DeleteTextures(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::BindTexture(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::PrioritizeTextures(const Napi::CallbackInfo& info){
	//yet to implement !!
}

Napi::Value Opengl::AreTexturesResident(const Napi::CallbackInfo& info){
	//yet to implement !!
	return info.Env().Undefined();
}

Napi::Value Opengl::IsTexture(const Napi::CallbackInfo& info){
	//yet to implement !!
	return info.Env().Undefined();
}


void Opengl::TexSubImage1D(const Napi::CallbackInfo& info){
	//yet to implement !!
}


void Opengl::TexSubImage2D(const Napi::CallbackInfo& info){
	//yet to implement !!
}


void Opengl::CopyTexImage1D(const Napi::CallbackInfo& info){
	//yet to implement !!
}


void Opengl::CopyTexImage2D(const Napi::CallbackInfo& info){
	//yet to implement !!
}


void Opengl::CopyTexSubImage1D(const Napi::CallbackInfo& info){
	//yet to implement !!
}


void Opengl::CopyTexSubImage2D(const Napi::CallbackInfo& info){
	//yet to implement !!
}


	/*
	 * Evaluators
	 */

void Opengl::Map1d(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Map1f(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::Map2d(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::Map2f(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::GetMapdv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::GetMapfv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::GetMapiv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::EvalCoord1d(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::EvalCoord1f(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::EvalCoord1dv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::EvalCoord1fv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::EvalCoord2d(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::EvalCoord2f(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::EvalCoord2dv(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::EvalCoord2fv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::MapGrid1d(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::MapGrid1f(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::MapGrid2d(const Napi::CallbackInfo& info){
	//yet to implement !!
}
void Opengl::MapGrid2f(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::EvalPoint1(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::EvalPoint2(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::EvalMesh1(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::EvalMesh2(const Napi::CallbackInfo& info){
	//yet to implement !!
}


	/*
	 * Fog
	 */

void Opengl::Fogf(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::Fogi(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::Fogfv(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::Fogiv(const Napi::CallbackInfo& info){
	//yet to implement !!
}


	/*
	 * Selection and Feedback
	 */

void Opengl::FeedbackBuffer(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::PassThrough(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::SelectBuffer(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::InitNames(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::LoadName(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::PushName(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::PopName(const Napi::CallbackInfo& info){
	//yet to implement !!
}

void Opengl::BlendEquation(const Napi::CallbackInfo& info){
	uint mode = info[0].As<Napi::Number>();

	glBlendEquation(mode);
}

void Opengl::BlendColor(const Napi::CallbackInfo& info){
	float red = info[0].As<Napi::Number>(),
				green = info[1].As<Napi::Number>(),
				blue = info[2].As<Napi::Number>(),
				alpha = info[3].As<Napi::Number>();

	glBlendColor(red, green, blue, alpha);
}

void Opengl::BlendEquationSeparateATI(const Napi::CallbackInfo& info){
	uint modeRGB = info[0].As<Napi::Number>(),
			 modeA = info[1].As<Napi::Number>();

	glBlendEquationSeparateATI(modeRGB, modeA);
}

void Opengl::Init(Napi::Env& env, Napi::Object& exports){
	Napi::Object obj = Napi::Object::New(env);

	obj.Set("ClearIndex", Napi::Function::New(env, Opengl::ClearIndex));
	obj.Set("ClearColor", Napi::Function::New(env, Opengl::ClearColor));
	obj.Set("Clear", Napi::Function::New(env, Opengl::Clear));
	obj.Set("IndexMask", Napi::Function::New(env, Opengl::IndexMask));
	obj.Set("ColorMask", Napi::Function::New(env, Opengl::ColorMask));
	obj.Set("AlphaFunc", Napi::Function::New(env, Opengl::AlphaFunc));
	obj.Set("BlendFunc", Napi::Function::New(env, Opengl::BlendFunc));
	obj.Set("LogicOp", Napi::Function::New(env, Opengl::LogicOp));
	obj.Set("CullFace", Napi::Function::New(env, Opengl::CullFace));
	obj.Set("FrontFace", Napi::Function::New(env, Opengl::FrontFace));
	obj.Set("PointSize", Napi::Function::New(env, Opengl::PointSize));
	obj.Set("LineWidth", Napi::Function::New(env, Opengl::LineWidth));
	obj.Set("LineStipple", Napi::Function::New(env, Opengl::LineStipple));
	obj.Set("PolygonMode", Napi::Function::New(env, Opengl::PolygonMode));
	obj.Set("PolygonOffset", Napi::Function::New(env, Opengl::PolygonOffset));
	obj.Set("PolygonStipple", Napi::Function::New(env, Opengl::PolygonStipple));
	obj.Set("GetPolygonStipple", Napi::Function::New(env, Opengl::GetPolygonStipple));
	obj.Set("EdgeFlag", Napi::Function::New(env, Opengl::EdgeFlag));
	obj.Set("EdgeFlagv", Napi::Function::New(env, Opengl::EdgeFlagv));
	obj.Set("Scissor", Napi::Function::New(env, Opengl::Scissor));
	obj.Set("ClipPlane", Napi::Function::New(env, Opengl::ClipPlane));
	obj.Set("GetClipPlane", Napi::Function::New(env, Opengl::GetClipPlane));
	obj.Set("DrawBuffer", Napi::Function::New(env, Opengl::DrawBuffer));
	obj.Set("ReadBuffer", Napi::Function::New(env, Opengl::ReadBuffer));
	obj.Set("Enable", Napi::Function::New(env, Opengl::Enable));
	obj.Set("Disable", Napi::Function::New(env, Opengl::Disable));
	obj.Set("IsEnabled", Napi::Function::New(env, Opengl::IsEnabled));
	obj.Set("EnableClientState", Napi::Function::New(env, Opengl::EnableClientState));
	obj.Set("DisableClientState", Napi::Function::New(env, Opengl::DisableClientState));
	obj.Set("GetBooleanv", Napi::Function::New(env, Opengl::GetBooleanv));
	obj.Set("GetDoublev", Napi::Function::New(env, Opengl::GetDoublev));
	obj.Set("GetFloatv", Napi::Function::New(env, Opengl::GetFloatv));
	obj.Set("GetIntegerv", Napi::Function::New(env, Opengl::GetIntegerv));
	obj.Set("PushAttrib", Napi::Function::New(env, Opengl::PushAttrib));
	obj.Set("PopAttrib", Napi::Function::New(env, Opengl::PopAttrib));
	obj.Set("PushClientAttrib", Napi::Function::New(env, Opengl::PushClientAttrib));
	obj.Set("PopClientAttrib", Napi::Function::New(env, Opengl::PopClientAttrib));
	obj.Set("RenderMode", Napi::Function::New(env, Opengl::RenderMode));
	obj.Set("Finish", Napi::Function::New(env, Opengl::Finish));
	obj.Set("Flush", Napi::Function::New(env, Opengl::Flush));
	obj.Set("Hint", Napi::Function::New(env, Opengl::Hint));
	obj.Set("ClearDepth", Napi::Function::New(env, Opengl::ClearDepth));
	obj.Set("DepthFunc", Napi::Function::New(env, Opengl::DepthFunc));
	obj.Set("DepthMask", Napi::Function::New(env, Opengl::DepthMask));
	obj.Set("DepthRange", Napi::Function::New(env, Opengl::DepthRange));
	obj.Set("ClearAccum", Napi::Function::New(env, Opengl::ClearAccum));
	obj.Set("Accum", Napi::Function::New(env, Opengl::Accum));
	obj.Set("MatrixMode", Napi::Function::New(env, Opengl::MatrixMode));
	obj.Set("Ortho", Napi::Function::New(env, Opengl::Ortho));
	obj.Set("Frustum", Napi::Function::New(env, Opengl::Frustum));
	obj.Set("Viewport", Napi::Function::New(env, Opengl::Viewport));
	obj.Set("PushMatrix", Napi::Function::New(env, Opengl::PushMatrix));
	obj.Set("PopMatrix", Napi::Function::New(env, Opengl::PopMatrix));
	obj.Set("LoadIdentity", Napi::Function::New(env, Opengl::LoadIdentity));
	obj.Set("LoadMatrixd", Napi::Function::New(env, Opengl::LoadMatrixd));
	obj.Set("LoadMatrixf", Napi::Function::New(env, Opengl::LoadMatrixf));
	obj.Set("MultMatrixd", Napi::Function::New(env, Opengl::MultMatrixd));
	obj.Set("MultMatrixf", Napi::Function::New(env, Opengl::MultMatrixf));
	obj.Set("Rotated", Napi::Function::New(env, Opengl::Rotated));
	obj.Set("Rotatef", Napi::Function::New(env, Opengl::Rotatef));
	obj.Set("Scaled", Napi::Function::New(env, Opengl::Scaled));
	obj.Set("Scalef", Napi::Function::New(env, Opengl::Scalef));
	obj.Set("Translated", Napi::Function::New(env, Opengl::Translated));
	obj.Set("Translatef", Napi::Function::New(env, Opengl::Translatef));
	obj.Set("IsList", Napi::Function::New(env, Opengl::IsList));
	obj.Set("DeleteLists", Napi::Function::New(env, Opengl::DeleteLists));
	obj.Set("GenLists", Napi::Function::New(env, Opengl::GenLists));
	obj.Set("NewList", Napi::Function::New(env, Opengl::NewList));
	obj.Set("EndList", Napi::Function::New(env, Opengl::EndList));
	obj.Set("CallList", Napi::Function::New(env, Opengl::CallList));
	obj.Set("CallLists", Napi::Function::New(env, Opengl::CallLists));
	obj.Set("ListBase", Napi::Function::New(env, Opengl::ListBase));
	obj.Set("Begin", Napi::Function::New(env, Opengl::Begin));
	obj.Set("End", Napi::Function::New(env, Opengl::End));
	obj.Set("Vertex2d", Napi::Function::New(env, Opengl::Vertex2d));
	obj.Set("Vertex2f", Napi::Function::New(env, Opengl::Vertex2f));
	obj.Set("Vertex2i", Napi::Function::New(env, Opengl::Vertex2i));
	obj.Set("Vertex2s", Napi::Function::New(env, Opengl::Vertex2s));
	obj.Set("Vertex3d", Napi::Function::New(env, Opengl::Vertex3d));
	obj.Set("Vertex3f", Napi::Function::New(env, Opengl::Vertex3f));
	obj.Set("Vertex3i", Napi::Function::New(env, Opengl::Vertex3i));
	obj.Set("Vertex3s", Napi::Function::New(env, Opengl::Vertex3s));
	obj.Set("Vertex4d", Napi::Function::New(env, Opengl::Vertex4d));
	obj.Set("Vertex4f", Napi::Function::New(env, Opengl::Vertex4f));
	obj.Set("Vertex4i", Napi::Function::New(env, Opengl::Vertex4i));
	obj.Set("Vertex4s", Napi::Function::New(env, Opengl::Vertex4s));
	obj.Set("Vertex2dv", Napi::Function::New(env, Opengl::Vertex2dv));
	obj.Set("Vertex2fv", Napi::Function::New(env, Opengl::Vertex2fv));
	obj.Set("Vertex2iv", Napi::Function::New(env, Opengl::Vertex2iv));
	obj.Set("Vertex2sv", Napi::Function::New(env, Opengl::Vertex2sv));
	obj.Set("Vertex3dv", Napi::Function::New(env, Opengl::Vertex3dv));
	obj.Set("Vertex3fv", Napi::Function::New(env, Opengl::Vertex3fv));
	obj.Set("Vertex3iv", Napi::Function::New(env, Opengl::Vertex3iv));
	obj.Set("Vertex3sv", Napi::Function::New(env, Opengl::Vertex3sv));
	obj.Set("Vertex4dv", Napi::Function::New(env, Opengl::Vertex4dv));
	obj.Set("Vertex4fv", Napi::Function::New(env, Opengl::Vertex4fv));
	obj.Set("Vertex4iv", Napi::Function::New(env, Opengl::Vertex4iv));
	obj.Set("Vertex4sv", Napi::Function::New(env, Opengl::Vertex4sv));
	obj.Set("Normal3b", Napi::Function::New(env, Opengl::Normal3b));
	obj.Set("Normal3d", Napi::Function::New(env, Opengl::Normal3d));
	obj.Set("Normal3f", Napi::Function::New(env, Opengl::Normal3f));
	obj.Set("Normal3i", Napi::Function::New(env, Opengl::Normal3i));
	obj.Set("Normal3s", Napi::Function::New(env, Opengl::Normal3s));
	obj.Set("Normal3bv", Napi::Function::New(env, Opengl::Normal3bv));
	obj.Set("Normal3dv", Napi::Function::New(env, Opengl::Normal3dv));
	obj.Set("Normal3fv", Napi::Function::New(env, Opengl::Normal3fv));
	obj.Set("Normal3iv", Napi::Function::New(env, Opengl::Normal3iv));
	obj.Set("Normal3sv", Napi::Function::New(env, Opengl::Normal3sv));
	obj.Set("Indexd", Napi::Function::New(env, Opengl::Indexd));
	obj.Set("Indexf", Napi::Function::New(env, Opengl::Indexf));
	obj.Set("Indexi", Napi::Function::New(env, Opengl::Indexi));
	obj.Set("Indexs", Napi::Function::New(env, Opengl::Indexs));
	obj.Set("Indexub", Napi::Function::New(env, Opengl::Indexub));
	obj.Set("Indexdv", Napi::Function::New(env, Opengl::Indexdv));
	obj.Set("Indexfv", Napi::Function::New(env, Opengl::Indexfv));
	obj.Set("Indexiv", Napi::Function::New(env, Opengl::Indexiv));
	obj.Set("Indexsv", Napi::Function::New(env, Opengl::Indexsv));
	obj.Set("Indexubv", Napi::Function::New(env, Opengl::Indexubv));
	obj.Set("Color3b", Napi::Function::New(env, Opengl::Color3b));
	obj.Set("Color3d", Napi::Function::New(env, Opengl::Color3d));
	obj.Set("Color3f", Napi::Function::New(env, Opengl::Color3f));
	obj.Set("Color3i", Napi::Function::New(env, Opengl::Color3i));
	obj.Set("Color3s", Napi::Function::New(env, Opengl::Color3s));
	obj.Set("Color3ub", Napi::Function::New(env, Opengl::Color3ub));
	obj.Set("Color3ui", Napi::Function::New(env, Opengl::Color3ui));
	obj.Set("Color3us", Napi::Function::New(env, Opengl::Color3us));
	obj.Set("Color4b", Napi::Function::New(env, Opengl::Color4b));
	obj.Set("Color4d", Napi::Function::New(env, Opengl::Color4d));
	obj.Set("Color4f", Napi::Function::New(env, Opengl::Color4f));
	obj.Set("Color4i", Napi::Function::New(env, Opengl::Color4i));
	obj.Set("Color4s", Napi::Function::New(env, Opengl::Color4s));
	obj.Set("Color4ub", Napi::Function::New(env, Opengl::Color4ub));
	obj.Set("Color4ui", Napi::Function::New(env, Opengl::Color4ui));
	obj.Set("Color4us", Napi::Function::New(env, Opengl::Color4us));
	obj.Set("Color3bv", Napi::Function::New(env, Opengl::Color3bv));
	obj.Set("Color3dv", Napi::Function::New(env, Opengl::Color3dv));
	obj.Set("Color3fv", Napi::Function::New(env, Opengl::Color3fv));
	obj.Set("Color3iv", Napi::Function::New(env, Opengl::Color3iv));
	obj.Set("Color3sv", Napi::Function::New(env, Opengl::Color3sv));
	obj.Set("Color3ubv", Napi::Function::New(env, Opengl::Color3ubv));
	obj.Set("Color3uiv", Napi::Function::New(env, Opengl::Color3uiv));
	obj.Set("Color3usv", Napi::Function::New(env, Opengl::Color3usv));
	obj.Set("Color4bv", Napi::Function::New(env, Opengl::Color4bv));
	obj.Set("Color4dv", Napi::Function::New(env, Opengl::Color4dv));
	obj.Set("Color4fv", Napi::Function::New(env, Opengl::Color4fv));
	obj.Set("Color4iv", Napi::Function::New(env, Opengl::Color4iv));
	obj.Set("Color4sv", Napi::Function::New(env, Opengl::Color4sv));
	obj.Set("Color4ubv", Napi::Function::New(env, Opengl::Color4ubv));
	obj.Set("Color4uiv", Napi::Function::New(env, Opengl::Color4uiv));
	obj.Set("Color4usv", Napi::Function::New(env, Opengl::Color4usv));
	obj.Set("TexCoord1d", Napi::Function::New(env, Opengl::TexCoord1d));
	obj.Set("TexCoord1f", Napi::Function::New(env, Opengl::TexCoord1f));
	obj.Set("TexCoord1i", Napi::Function::New(env, Opengl::TexCoord1i));
	obj.Set("TexCoord1s", Napi::Function::New(env, Opengl::TexCoord1s));
	obj.Set("TexCoord2d", Napi::Function::New(env, Opengl::TexCoord2d));
	obj.Set("TexCoord2f", Napi::Function::New(env, Opengl::TexCoord2f));
	obj.Set("TexCoord2i", Napi::Function::New(env, Opengl::TexCoord2i));
	obj.Set("TexCoord2s", Napi::Function::New(env, Opengl::TexCoord2s));
	obj.Set("TexCoord3d", Napi::Function::New(env, Opengl::TexCoord3d));
	obj.Set("TexCoord3f", Napi::Function::New(env, Opengl::TexCoord3f));
	obj.Set("TexCoord3i", Napi::Function::New(env, Opengl::TexCoord3i));
	obj.Set("TexCoord3s", Napi::Function::New(env, Opengl::TexCoord3s));
	obj.Set("TexCoord4d", Napi::Function::New(env, Opengl::TexCoord4d));
	obj.Set("TexCoord4f", Napi::Function::New(env, Opengl::TexCoord4f));
	obj.Set("TexCoord4i", Napi::Function::New(env, Opengl::TexCoord4i));
	obj.Set("TexCoord4s", Napi::Function::New(env, Opengl::TexCoord4s));
	obj.Set("TexCoord1dv", Napi::Function::New(env, Opengl::TexCoord1dv));
	obj.Set("TexCoord1fv", Napi::Function::New(env, Opengl::TexCoord1fv));
	obj.Set("TexCoord1iv", Napi::Function::New(env, Opengl::TexCoord1iv));
	obj.Set("TexCoord1sv", Napi::Function::New(env, Opengl::TexCoord1sv));
	obj.Set("TexCoord2dv", Napi::Function::New(env, Opengl::TexCoord2dv));
	obj.Set("TexCoord2fv", Napi::Function::New(env, Opengl::TexCoord2fv));
	obj.Set("TexCoord2iv", Napi::Function::New(env, Opengl::TexCoord2iv));
	obj.Set("TexCoord2sv", Napi::Function::New(env, Opengl::TexCoord2sv));
	obj.Set("TexCoord3dv", Napi::Function::New(env, Opengl::TexCoord3dv));
	obj.Set("TexCoord3fv", Napi::Function::New(env, Opengl::TexCoord3fv));
	obj.Set("TexCoord3iv", Napi::Function::New(env, Opengl::TexCoord3iv));
	obj.Set("TexCoord3sv", Napi::Function::New(env, Opengl::TexCoord3sv));
	obj.Set("TexCoord4dv", Napi::Function::New(env, Opengl::TexCoord4dv));
	obj.Set("TexCoord4fv", Napi::Function::New(env, Opengl::TexCoord4fv));
	obj.Set("TexCoord4iv", Napi::Function::New(env, Opengl::TexCoord4iv));
	obj.Set("TexCoord4sv", Napi::Function::New(env, Opengl::TexCoord4sv));
	obj.Set("RasterPos2d", Napi::Function::New(env, Opengl::RasterPos2d));
	obj.Set("RasterPos2f", Napi::Function::New(env, Opengl::RasterPos2f));
	obj.Set("RasterPos2i", Napi::Function::New(env, Opengl::RasterPos2i));
	obj.Set("RasterPos2s", Napi::Function::New(env, Opengl::RasterPos2s));
	obj.Set("RasterPos3d", Napi::Function::New(env, Opengl::RasterPos3d));
	obj.Set("RasterPos3f", Napi::Function::New(env, Opengl::RasterPos3f));
	obj.Set("RasterPos3i", Napi::Function::New(env, Opengl::RasterPos3i));
	obj.Set("RasterPos3s", Napi::Function::New(env, Opengl::RasterPos3s));
	obj.Set("RasterPos4d", Napi::Function::New(env, Opengl::RasterPos4d));
	obj.Set("RasterPos4f", Napi::Function::New(env, Opengl::RasterPos4f));
	obj.Set("RasterPos4i", Napi::Function::New(env, Opengl::RasterPos4i));
	obj.Set("RasterPos4s", Napi::Function::New(env, Opengl::RasterPos4s));
	obj.Set("RasterPos2dv", Napi::Function::New(env, Opengl::RasterPos2dv));
	obj.Set("RasterPos2fv", Napi::Function::New(env, Opengl::RasterPos2fv));
	obj.Set("RasterPos2iv", Napi::Function::New(env, Opengl::RasterPos2iv));
	obj.Set("RasterPos2sv", Napi::Function::New(env, Opengl::RasterPos2sv));
	obj.Set("RasterPos3dv", Napi::Function::New(env, Opengl::RasterPos3dv));
	obj.Set("RasterPos3fv", Napi::Function::New(env, Opengl::RasterPos3fv));
	obj.Set("RasterPos3iv", Napi::Function::New(env, Opengl::RasterPos3iv));
	obj.Set("RasterPos3sv", Napi::Function::New(env, Opengl::RasterPos3sv));
	obj.Set("RasterPos4dv", Napi::Function::New(env, Opengl::RasterPos4dv));
	obj.Set("RasterPos4fv", Napi::Function::New(env, Opengl::RasterPos4fv));
	obj.Set("RasterPos4iv", Napi::Function::New(env, Opengl::RasterPos4iv));
	obj.Set("RasterPos4sv", Napi::Function::New(env, Opengl::RasterPos4sv));
	obj.Set("Rectd", Napi::Function::New(env, Opengl::Rectd));
	obj.Set("Rectf", Napi::Function::New(env, Opengl::Rectf));
	obj.Set("Recti", Napi::Function::New(env, Opengl::Recti));
	obj.Set("Rects", Napi::Function::New(env, Opengl::Rects));
	obj.Set("Rectdv", Napi::Function::New(env, Opengl::Rectdv));
	obj.Set("Rectfv", Napi::Function::New(env, Opengl::Rectfv));
	obj.Set("Rectiv", Napi::Function::New(env, Opengl::Rectiv));
	obj.Set("Rectsv", Napi::Function::New(env, Opengl::Rectsv));
	obj.Set("VertexPointer", Napi::Function::New(env, Opengl::VertexPointer));
	obj.Set("NormalPointer", Napi::Function::New(env, Opengl::NormalPointer));
	obj.Set("ColorPointer", Napi::Function::New(env, Opengl::ColorPointer));
	obj.Set("IndexPointer", Napi::Function::New(env, Opengl::IndexPointer));
	obj.Set("TexCoordPointer", Napi::Function::New(env, Opengl::TexCoordPointer));
	obj.Set("EdgeFlagPointer", Napi::Function::New(env, Opengl::EdgeFlagPointer));
	obj.Set("GetPointerv", Napi::Function::New(env, Opengl::GetPointerv));
	obj.Set("ArrayElement", Napi::Function::New(env, Opengl::ArrayElement));
	obj.Set("DrawArrays", Napi::Function::New(env, Opengl::DrawArrays));
	obj.Set("DrawElements", Napi::Function::New(env, Opengl::DrawElements));
	obj.Set("InterleavedArrays", Napi::Function::New(env, Opengl::InterleavedArrays));
	obj.Set("ShadeModel", Napi::Function::New(env, Opengl::ShadeModel));
	obj.Set("Lightf", Napi::Function::New(env, Opengl::Lightf));
	obj.Set("Lighti", Napi::Function::New(env, Opengl::Lighti));
	obj.Set("Lightfv", Napi::Function::New(env, Opengl::Lightfv));
	obj.Set("Lightiv", Napi::Function::New(env, Opengl::Lightiv));
	obj.Set("GetLightfv", Napi::Function::New(env, Opengl::GetLightfv));
	obj.Set("GetLightiv", Napi::Function::New(env, Opengl::GetLightiv));
	obj.Set("LightModelf", Napi::Function::New(env, Opengl::LightModelf));
	obj.Set("LightModeli", Napi::Function::New(env, Opengl::LightModeli));
	obj.Set("LightModelfv", Napi::Function::New(env, Opengl::LightModelfv));
	obj.Set("LightModeliv", Napi::Function::New(env, Opengl::LightModeliv));
	obj.Set("Materialf", Napi::Function::New(env, Opengl::Materialf));
	obj.Set("Materiali", Napi::Function::New(env, Opengl::Materiali));
	obj.Set("Materialfv", Napi::Function::New(env, Opengl::Materialfv));
	obj.Set("Materialiv", Napi::Function::New(env, Opengl::Materialiv));
	obj.Set("GetMaterialfv", Napi::Function::New(env, Opengl::GetMaterialfv));
	obj.Set("GetMaterialiv", Napi::Function::New(env, Opengl::GetMaterialiv));
	obj.Set("ColorMaterial", Napi::Function::New(env, Opengl::ColorMaterial));
	obj.Set("PixelZoom", Napi::Function::New(env, Opengl::PixelZoom));
	obj.Set("PixelStoref", Napi::Function::New(env, Opengl::PixelStoref));
	obj.Set("PixelStorei", Napi::Function::New(env, Opengl::PixelStorei));
	obj.Set("PixelTransferf", Napi::Function::New(env, Opengl::PixelTransferf));
	obj.Set("PixelTransferi", Napi::Function::New(env, Opengl::PixelTransferi));
	obj.Set("PixelMapfv", Napi::Function::New(env, Opengl::PixelMapfv));
	obj.Set("PixelMapuiv", Napi::Function::New(env, Opengl::PixelMapuiv));
	obj.Set("PixelMapusv", Napi::Function::New(env, Opengl::PixelMapusv));
	obj.Set("GetPixelMapfv", Napi::Function::New(env, Opengl::GetPixelMapfv));
	obj.Set("GetPixelMapuiv", Napi::Function::New(env, Opengl::GetPixelMapuiv));
	obj.Set("GetPixelMapusv", Napi::Function::New(env, Opengl::GetPixelMapusv));
	obj.Set("Bitmap", Napi::Function::New(env, Opengl::Bitmap));
	obj.Set("ReadPixels", Napi::Function::New(env, Opengl::ReadPixels));
	obj.Set("DrawPixels", Napi::Function::New(env, Opengl::DrawPixels));
	obj.Set("CopyPixels", Napi::Function::New(env, Opengl::CopyPixels));
	obj.Set("StencilFunc", Napi::Function::New(env, Opengl::StencilFunc));
	obj.Set("StencilMask", Napi::Function::New(env, Opengl::StencilMask));
	obj.Set("StencilOp", Napi::Function::New(env, Opengl::StencilOp));
	obj.Set("ClearStencil", Napi::Function::New(env, Opengl::ClearStencil));
	obj.Set("TexGend", Napi::Function::New(env, Opengl::TexGend));
	obj.Set("TexGenf", Napi::Function::New(env, Opengl::TexGenf));
	obj.Set("TexGeni", Napi::Function::New(env, Opengl::TexGeni));
	obj.Set("TexGendv", Napi::Function::New(env, Opengl::TexGendv));
	obj.Set("TexGenfv", Napi::Function::New(env, Opengl::TexGenfv));
	obj.Set("TexGeniv", Napi::Function::New(env, Opengl::TexGeniv));
	obj.Set("GetTexGendv", Napi::Function::New(env, Opengl::GetTexGendv));
	obj.Set("GetTexGenfv", Napi::Function::New(env, Opengl::GetTexGenfv));
	obj.Set("GetTexGeniv", Napi::Function::New(env, Opengl::GetTexGeniv));
	obj.Set("TexEnvf", Napi::Function::New(env, Opengl::TexEnvf));
	obj.Set("TexEnvi", Napi::Function::New(env, Opengl::TexEnvi));
	obj.Set("TexEnvfv", Napi::Function::New(env, Opengl::TexEnvfv));
	obj.Set("TexEnviv", Napi::Function::New(env, Opengl::TexEnviv));
	obj.Set("GetTexEnvfv", Napi::Function::New(env, Opengl::GetTexEnvfv));
	obj.Set("GetTexEnviv", Napi::Function::New(env, Opengl::GetTexEnviv));
	obj.Set("TexParameterf", Napi::Function::New(env, Opengl::TexParameterf));
	obj.Set("TexParameteri", Napi::Function::New(env, Opengl::TexParameteri));
	obj.Set("TexParameterfv", Napi::Function::New(env, Opengl::TexParameterfv));
	obj.Set("TexParameteriv", Napi::Function::New(env, Opengl::TexParameteriv));
	obj.Set("GetTexParameterfv", Napi::Function::New(env, Opengl::GetTexParameterfv));
	obj.Set("GetTexParameteriv", Napi::Function::New(env, Opengl::GetTexParameteriv));
	obj.Set("GetTexLevelParameterfv", Napi::Function::New(env, Opengl::GetTexLevelParameterfv));
	obj.Set("GetTexLevelParameteriv", Napi::Function::New(env, Opengl::GetTexLevelParameteriv));
	obj.Set("TexImage1D", Napi::Function::New(env, Opengl::TexImage1D));
	obj.Set("TexImage2D", Napi::Function::New(env, Opengl::TexImage2D));
	obj.Set("GetTexImage", Napi::Function::New(env, Opengl::GetTexImage));
	obj.Set("GenTextures", Napi::Function::New(env, Opengl::GenTextures));
	obj.Set("DeleteTextures", Napi::Function::New(env, Opengl::DeleteTextures));
	obj.Set("BindTexture", Napi::Function::New(env, Opengl::BindTexture));
	obj.Set("PrioritizeTextures", Napi::Function::New(env, Opengl::PrioritizeTextures));
	obj.Set("AreTexturesResident", Napi::Function::New(env, Opengl::AreTexturesResident));
	obj.Set("IsTexture", Napi::Function::New(env, Opengl::IsTexture));
	obj.Set("TexSubImage1D", Napi::Function::New(env, Opengl::TexSubImage1D));
	obj.Set("TexSubImage2D", Napi::Function::New(env, Opengl::TexSubImage2D));
	obj.Set("CopyTexImage1D", Napi::Function::New(env, Opengl::CopyTexImage1D));
	obj.Set("CopyTexImage2D", Napi::Function::New(env, Opengl::CopyTexImage2D));
	obj.Set("CopyTexSubImage1D", Napi::Function::New(env, Opengl::CopyTexSubImage1D));
	obj.Set("CopyTexSubImage2D", Napi::Function::New(env, Opengl::CopyTexSubImage2D));
	obj.Set("Map1d", Napi::Function::New(env, Opengl::Map1d));
	obj.Set("Map1f", Napi::Function::New(env, Opengl::Map1f));
	obj.Set("Map2d", Napi::Function::New(env, Opengl::Map2d));
	obj.Set("Map2f", Napi::Function::New(env, Opengl::Map2f));
	obj.Set("GetMapdv", Napi::Function::New(env, Opengl::GetMapdv));
	obj.Set("GetMapfv", Napi::Function::New(env, Opengl::GetMapfv));
	obj.Set("GetMapiv", Napi::Function::New(env, Opengl::GetMapiv));
	obj.Set("EvalCoord1d", Napi::Function::New(env, Opengl::EvalCoord1d));
	obj.Set("EvalCoord1f", Napi::Function::New(env, Opengl::EvalCoord1f));
	obj.Set("EvalCoord1dv", Napi::Function::New(env, Opengl::EvalCoord1dv));
	obj.Set("EvalCoord1fv", Napi::Function::New(env, Opengl::EvalCoord1fv));
	obj.Set("EvalCoord2d", Napi::Function::New(env, Opengl::EvalCoord2d));
	obj.Set("EvalCoord2f", Napi::Function::New(env, Opengl::EvalCoord2f));
	obj.Set("EvalCoord2dv", Napi::Function::New(env, Opengl::EvalCoord2dv));
	obj.Set("EvalCoord2fv", Napi::Function::New(env, Opengl::EvalCoord2fv));
	obj.Set("MapGrid1d", Napi::Function::New(env, Opengl::MapGrid1d));
	obj.Set("MapGrid1f", Napi::Function::New(env, Opengl::MapGrid1f));
	obj.Set("MapGrid2d", Napi::Function::New(env, Opengl::MapGrid2d));
	obj.Set("MapGrid2f", Napi::Function::New(env, Opengl::MapGrid2f));
	obj.Set("EvalPoint1", Napi::Function::New(env, Opengl::EvalPoint1));
	obj.Set("EvalPoint2", Napi::Function::New(env, Opengl::EvalPoint2));
	obj.Set("EvalMesh1", Napi::Function::New(env, Opengl::EvalMesh1));
	obj.Set("EvalMesh2", Napi::Function::New(env, Opengl::EvalMesh2));
	obj.Set("Fogf", Napi::Function::New(env, Opengl::Fogf));
	obj.Set("Fogi", Napi::Function::New(env, Opengl::Fogi));
	obj.Set("Fogfv", Napi::Function::New(env, Opengl::Fogfv));
	obj.Set("Fogiv", Napi::Function::New(env, Opengl::Fogiv));
	obj.Set("FeedbackBuffer", Napi::Function::New(env, Opengl::FeedbackBuffer));
	obj.Set("PassThrough", Napi::Function::New(env, Opengl::PassThrough));
	obj.Set("SelectBuffer", Napi::Function::New(env, Opengl::SelectBuffer));
	obj.Set("InitNames", Napi::Function::New(env, Opengl::InitNames));
	obj.Set("LoadName", Napi::Function::New(env, Opengl::LoadName));
	obj.Set("PushName", Napi::Function::New(env, Opengl::PushName));
	obj.Set("PopName", Napi::Function::New(env, Opengl::PopName));
	obj.Set("BlendEquation", Napi::Function::New(env, Opengl::BlendEquation));
	obj.Set("BlendColor", Napi::Function::New(env, Opengl::BlendColor));
	obj.Set("BlendEquationSeparateATI", Napi::Function::New(env, Opengl::BlendEquationSeparateATI));

	exports.Set("gl", obj);
}