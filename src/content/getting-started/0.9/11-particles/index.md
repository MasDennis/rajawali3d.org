All the files can been found in the [Rajawali Example project](https://github.com/MasDennis/RajawaliExamples) but it'll outline the most important things here.

In this particle system class we add another `FloatBuffer` in which the velocity vectors are stored for each particle. The position, texture coords, normals, etc for each individual particle are stored in arrays and the converter to either `FloatBuffers` or `ShortBuffers`:
```
final int numParticles = 5000;

float[] vertices = new float[numParticles * 3];
float[] velocity = new float[numParticles * 3];
float[] textureCoords = new float[numParticles * 2];
float[] normals = new float[numParticles * 3];
float[] colors = new float[numParticles * 4];
short[] indices = new short[numParticles];

int index = 0;

for(int i=0; i<numParticles; ++i) {
	index = i * 3;
	vertices[index] = 0;
	vertices[index + 1] = 0;
	vertices[index + 2] = 0;

	velocity[index] = -.5f + ((float)Math.random() * 1f);
	velocity[index + 1] = -.5f + ((float)Math.random() * 1f);
	velocity[index + 2] = .5f + ((float)Math.random() * 1f);

	normals[index] = 0;
	normals[index + 1] = 0;
	normals[index + 2] = 1;

	index = i * 2;
	textureCoords[i] = 0;
	textureCoords[i + 1] = 0;

	index = i * 4;
	colors[i] = 1;
	colors[i + 1] = i;
	colors[i + 2] = i;
	colors[i + 3] = i;

	indices[i] = (short)i;
}

mVelocityBuffer = ByteBuffer
		.allocateDirect(velocity.length * FLOAT_SIZE_BYTES)
		.order(ByteOrder.nativeOrder()).asFloatBuffer();
mVelocityBuffer.put(velocity).position(0);

mFriction = new Number3D(.95f, .95f, .95f);

setData(vertices, normals, textureCoords, colors, indices);
```
Then its important to override the render() method and update some of the `ParticleMaterial`'s properties:
```
@Override
public void render(Camera camera, float[] projMatrix, float[] vMatrix,
		final float[] parentMatrix) {
	mParticleShader.setFriction(mFriction);
	mParticleShader.setVelocity(mVelocityBuffer);
	mParticleShader.setMultiParticlesEnabled(true);
	super.render(camera, projMatrix, vMatrix, parentMatrix);
}
```
Bit of a short explanation this time, but the code should explain itself. 