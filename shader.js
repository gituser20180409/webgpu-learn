//顶点着色器代码
const vertex = /* wgsl */`
    @group(0) @binding(0) var<uniform> S:mat4x4<f32>;
    @vertex //声明顶点着色器
    fn main(@location(0) pos:vec3<f32>) -> @builtin(position) vec4<f32>{
        //@location指定从显存里面找到标记为0的顶点缓冲区中获取顶点数据
        //转成齐次坐标
        var pos2 = vec4<f32>(pos,1.0);
        //pos2.x -= 0.2;//偏移所有顶点x坐标
        //pos2.y -= 0.2;
        //pos2.z = 1.0;//z值0 - 1，xy值-1 - 1
        /*******缩放矩阵(x,y,z缩放0.5倍)******/
        // 0.5 0   0   0
        // 0   0.5 0   0
        // 0   0   0.5 0
        // 0   0   0   1
        var s = mat4x4<f32>(0.5,0,0,0, 0,0.5,0,0, 0,0,0.5,0, 0,0,0,1);
        /*******平移矩阵***/
        // 1 0 0 0.5
        // 0 1 0 0.5
        // 0 0 1 0.5
        // 0 0 0 1
        var t = mat4x4<f32>(1,0,0,0, 0,1,0,0, 0,0,1,0, -1,-1,0,1);
        //return t * s * pos2;//先缩放，在平移
        return S * pos2;//返回顶点数据给渲染管线的下一个环节用
    }
`;
//片元着色器代码
const fragment = /* wgsl */`
    @group(0) @binding(1) var<uniform> color:vec4<f32>;
    @fragment //声明片元着色器
    fn main() -> @location(0) vec4<f32>{
        //return vec4<f32>(0.0,0.9,1.0,1.0);//返回片元
        return color;
    }
`;
export {
    vertex,fragment
}
