#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//  Function from Iñigo Quiles 
//  www.iquilezles.org/www/articles/functions/functions.htm
float pcurve( float x, float a, float b ){
    float k = pow(a+b,a+b) / (pow(a,a)*pow(b,b));
    return k * pow( x, a ) * pow( 1.0-x, b );
}

float plot(vec2 _st, float _pct){
  return  smoothstep( _pct-0.01, _pct, _st.y) - 
          smoothstep( _pct, _pct+0.01, _st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    float y = pcurve(st.x,3.0,1.0);

    vec3 color = vec3(y);
    
    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}