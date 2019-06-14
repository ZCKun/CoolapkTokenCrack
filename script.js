String.prototype.format = function () {
    var values = arguments;
    return this.replace(/\{(\d+)\}/g, function (match, index) {
        if (values.length > index) {
            return values[index];
        } else {
            return "";
        }
    });
}




// Java.perform(function() {
//     var CoolMarket = Java.use('com.coolapk.market.CoolMarketApplication');
//     CoolMarket.onLog.implementation = function() {
//         var deviceId = Java.use('com.coolapk.market.util.SystemUtils').getDeviceId(this);
//         var app_token = Java.use('com.coolapk.market.util.AuthUtils').getAS(this, deviceId);
//         console.log('+++++> [onLog] 方法hook');
//         console.log('+Device Id: ', deviceId);
//         console.log('+App Token: ', app_token); 
//         console.log('++++++++++');
//         console.log('\n')
//         return true;
//     }
// })

var JNI_LOAD_POINTER = Module.getExportByName('libnative-lib.so', 'JNI_OnLoad');
var BASE_ADDR = parseInt(JNI_LOAD_POINTER) - parseInt('0x31A04');

//***********************************[Native Hook]***********************************
//j_getAuthString                   : 0x2E938
//MD5::update                       : 0x329AC
//MD5::finalize                     : 0x321C4
//getAuthString                     : 0x66500
//j__Z10b64_decodePKcj(b64_decode)  : 0x2E80C
//b64_decode_ex                     : 0x31F28
//std::__ndk1::basic_string         : 0x319D8
//_android_log_print                : 0x2E83C
//std::__ndk1::basic_string::__init : 0x31A8C


// // append 0x31d08
// Java.perform(function() {
//     var hookpointer = '0x' + parseInt(BASE_ADDR + parseInt('0x32168')).toString(16) // 获取要hook方法的地址
//     var pointer = new NativePointer(hookpointer) // 根据方法地址构建NativePointer
//     console.log('[append] hook pointer: ', pointer)
    
//     var arg0, arg1, arg2, arg3
//     Interceptor.attach(pointer, {
//             onEnter: function(args) {
//                 arg0 = args[0]
//                 arg1 = args[1]
//                 arg2 = args[2]
//                 arg3 = args[3]
//                 console.log('\n')
//                 // console.log('-----> {0}[MD5::MD5] 方法hook'.format(pointer))
//                 console.log('=====> [append] -> [方法调用前]')
//                 console.log('参数1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
//                 console.log('参数2: {0} => {1}'.format(arg1, Memory.readCString(arg1)))
//                 console.log('参数3: {0} => {1}'.format(arg2, Memory.readCString(arg2)))
//                 console.log('参数4: {0} => {1}'.format(arg3, Memory.readCString(arg3)))
//                 console.log('\n')
//             },
//             onLeave: function(retval) {
//                 console.log('\n')
//                 console.log('=====> [append] -> [方法调用后]:')
//                 console.log('返回值: ', retval)
//                 console.log('参数1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
//                 console.log('参数2: {0} => {1}'.format(arg1, Memory.readCString(arg1)))
//                 console.log('参数3: {0} => {1}'.format(arg2, Memory.readCString(arg2)))
//                 console.log('参数4: {0} => {1}'.format(arg3, Memory.readCString(arg3)))
//                 console.log('\n')
//             }
//         }   
//     )
// })


// MD5::hexdigest 0x32a2c
// Java.perform(function() {
//     var hookpointer = '0x' + parseInt(BASE_ADDR + parseInt('0x32a2c')).toString(16) // 获取要hook方法的地址
//     var pointer = new NativePointer(hookpointer) // 根据方法地址构建NativePointer
//     console.log('[MD5::hexdigest] hook pointer: ', pointer)
    
//     var arg0, arg1, arg2, arg3
//     Interceptor.attach(pointer, {
//             onEnter: function(args) {
//                 arg0 = args[0]
//                 arg1 = args[1]
//                 console.log('\n')
//                 console.log('=====> [MD5::hexdigest] -> [方法调用前]')
//                 console.log('参数1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
//                 console.log('参数2: {0} => {1}'.format(arg1, Memory.readCString(arg1)))
//                 console.log('\n')
//             },
//             onLeave: function(retval) {
//                 console.log('\n')
//                 console.log('=====> [MD5::hexdigest] -> [方法调用后]:')
//                 console.log('返回值: ', retval)
//                 console.log('参数1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
//                 console.log('参数2: {0} => {1}'.format(arg1, Memory.readCString(arg1)))
//                 var a = (arg1 >> 1).toString(16)
//                 console.log(a)
//                 console.log('参数2右移: {0} => {1}'.format(a, Memory.readCString(a)))
//                 console.log('\n')
//             }
//         }   
//     )
// })


// MD5::MD5
Java.perform(function() {
    var hookpointer = '0x' + parseInt(BASE_ADDR + parseInt('0x32168')).toString(16) // 获取要hook方法的地址
    var pointer = new NativePointer(hookpointer) // 根据方法地址构建NativePointer
    console.log('[MD5::MD5] hook pointer: ', pointer)
    
    var arg0, arg1, arg2, arg3
    Interceptor.attach(pointer, {
            onEnter: function(args) {
                arg0 = args[0]
                arg1 = args[1]
                // console.log('-----> {0}[MD5::MD5] 方法hook'.format(pointer))
                console.log('\n')
                console.log('=====> [MD5::MD5] -> [方法调用前]')
                // console.log('参数1: ', args[0])
                // console.log('参数2: ', args[1])
                // console.log('参数2: ', Memory.readCString(args[1]))
                console.log('参数1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
                console.log('参数2: {0} => {1}'.format(arg1, Memory.readCString(arg1)))
                console.log('\n')
            },
            onLeave: function(retval) {
                console.log('\n')
                console.log('=====> [MD5::MD5] -> [方法调用后]:')
                console.log('返回值: ', retval)
                console.log('参数1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
                console.log('参数2: {0} => {1}'.format(arg1, Memory.readCString(arg1)))
                console.log('\n')
            }
        }   
    )
})



// MD5::update
Java.perform(function() {
    var hookpointer = '0x' + parseInt(BASE_ADDR + parseInt('0x329AC')).toString(16) // 获取要hook方法的地址
    var pointer = new NativePointer(hookpointer) // 根据方法地址构建NativePointer
    console.log('[MD5::update] hook pointer: ', pointer)
    
    var arg0, arg1, arg2, arg3
    Interceptor.attach(pointer, {
            onEnter: function(args) {
                arg0 = args[0]
                arg1 = args[1]
                arg2 = args[2]
                // console.log('-----> {0}[MD5::update] 方法hook'.format(pointer))
                console.log('\n')
                console.log('=====> [MD5::update] -> [方法调用前]')
                // console.log('参数1: ', args[0])
                // console.log('参数2: ', args[1])
                // console.log('参数2: ', Memory.readCString(args[1]))
                // console.log('参数3: ', args[2])
                console.log('参数1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
                console.log('参数2: {0} => {1}'.format(arg1, Memory.readCString(arg1)))
                console.log('参数3: {0} => {1}'.format(arg2, Memory.readCString(arg2)))

                console.log('\n')
            },
            onLeave: function(retval) {
                console.log('\n')
                console.log('=====> [MD5::update] -> [方法调用后]:')
                console.log('返回值: ', retval)
                // console.log('参数1: ', args[0])
                // console.log('参数2: ', args[1])
                // console.log('参数3: ', args[2])
                console.log('参数1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
                console.log('参数2: {0} => {1}'.format(arg1, Memory.readCString(arg1)))
                console.log('参数3: {0} => {1}'.format(arg2, Memory.readCString(arg2)))
                console.log('\n')
            }
        }   
    )
})


// MD5::finalize
Java.perform(function() {
    var hookpointer = '0x' + parseInt(BASE_ADDR + parseInt('0x321C4')).toString(16) // 获取要hook方法的地址
    var pointer = new NativePointer(hookpointer) // 根据方法地址构建NativePointer
    console.log('[MD5::finalize] hook pointer: ', pointer)
    var arg0, arg1, arg2, arg3
    Interceptor.attach(pointer, {
            onEnter: function(args) {
                arg0 = args[0]
                arg1 = args[1]
                arg2 = args[2]
                arg3 = args[3]
                
                // console.log('-----> {0}[MD5::finalize] 方法hook'.format(pointer))
                console.log('\n')
                console.log('=====> [MD5::finalize] -> [方法调用前]')
                // console.log('参数1: ', args[0])
                // console.log('参数2: ', args[1])
                // console.log('参数3: ', args[2])
                // console.log('参数4: ', args[3])
                console.log('参数1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
                console.log('参数2: {0} => {1}'.format(arg1, Memory.readCString(arg1)))
                console.log('参数3: {0} => {1}'.format(arg2, Memory.readCString(arg2)))
                console.log('参数4: {0} => {1}'.format(arg3, Memory.readCString(arg3)))
                console.log('\n')
            },
            onLeave: function(retval) {
                console.log('\n')
                console.log('=====> [MD5::finalize] -> [方法调用后]:')
                console.log('返回值: ', retval)
                // console.log('参数1: ', args[0])
                // console.log('参数2: ', args[1])
                // console.log('参数3: ', args[2])
                // console.log('参数4: ', args[3])
                console.log('参数1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
                console.log('参数2: {0} => {1}'.format(arg1, Memory.readCString(arg1)))
                console.log('参数3: {0} => {1}'.format(arg2, Memory.readCString(arg2)))
                console.log('参数4: {0} => {1}'.format(arg3, Memory.readCString(arg3)))
                console.log('\n')
            }
        }   
    )
})


// // b64_encode
// Java.perform(function() {
//     var hook_pointer = '0x' + parseInt(BASE_ADDR + parseInt('0x31DB8')).toString(16);
//     var pointer = new NativePointer(hook_pointer);
//     // console.log('Hook Method Pointer: ', pointer);

//     var b64_encode = new NativeFunction(pointer, 'pointer', ['uchar', 'uint']);

//     Interceptor.attach(pointer, {
//         onEnter: function(args) {
//             console.log('====> [b64_encode] 方法hook');
//             console.log('=[onEnter]')
//             console.log('=', Memory.readCString(args[0]));
//             console.log('=', args[1].toInt32());
//             console.log('=');
//         },
//         onLeave: function(retval) {
//             console.log('=[onLeave]')
//             console.log('=', Memory.readCString(retval));
//             console.log('============')
//             console.log('\n')
//         }
//     });
// })


// // MD5::hexdigest
// Java.perform(function() {
//     var hook_pointer = '0x' + parseInt(BASE_ADDR + parseInt('0x32a2c')).toString(16)
//     var pointer = new NativePointer(hook_pointer)

//     var arg0
//     Interceptor.attach(pointer, {
//         onEnter: function(args) {
//             console.log('*****> [MD5::hexdigest] 方法hook')
//             console.log('*[onEnter]')
//             arg0 = args[0]
//             console.log('*arg2: ', Memory.readCString(args[1]))
//         },
//         onLeave: function(retval) {
//             console.log('*')
//             console.log('*[onLeave]')
//             console.log('*arg1: ', arg0)
//             console.log('*arg1: ', Memory.readCString(arg0))
//             console.log('\n')
//         }
//     })
// })



// b64_decode
// Java.perform(function() {
//     var load_pointer = Module.getExportByName('libnative-lib.so', 'JNI_OnLoad')//
//     var hookpointer = '0x' + parseInt(parseInt(load_pointer) - parseInt('0x31A04') + parseInt('0x31F28')).toString(16)
    
//     var pointer = new NativePointer(hookpointer)
//     var arg0, arg1, arg2, arg3
//     Interceptor.attach(pointer, {
//             onEnter: function(args) {
//                 console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;;;; [b64_decode_ex] method pointer: ', hookpointer)
//                 console.log('===== [{0} onEnter] ====='.format(pointer))
//                 arg0 = args[0]
//                 arg1 = args[1]
//                 arg2 = 0//args[2]
//                 arg3 = 0//args[3]
//                 console.log('[Params]:')
//                 console.log('\t[param]         : ({0}, {1}, {2}, {3})'
//                     .format(Memory.readCString(arg0), arg1, arg2, arg3))
//                 console.log('\n')
//             },
//             onLeave: function(retval) {
//                 console.log('===== [{0} onLeave] ====='.format(pointer))
//                 console.log('[Retval]:')
//                 console.log('\t[retval]         : ', retval)
//                 console.log('\n--------------------------------------------------')
//             }
//         }
//     )
// })




//MD5::finalize
// Java.perform(function() {
//     // var pointer = Module.getExportByName('libnative-lib.so', 'finalize')
//     var pointer = new NativePointer(0xC41F41C5)
//     console.log('native pointer: ', pointer)
//     Interceptor.attach(pointer,
//         {
//             onEnter: function(args) {
//                 console.log('===== [{0} onEnter] ====='.format(pointer))
//                 console.log('[Context information]:');
//                 console.log('\t[Context]  : ' + JSON.stringify(this.context));
//                 console.log('\t[Return]   : ' + this.returnAddress);
//                 console.log('\t[ThreadId] : ' + this.threadId);
//                 console.log('\t[Depth]    : ' + this.depth);
//                 console.log('\t[Errornr]  : ' + this.err);

//                 console.log('[Params]:')
//                 console.log('\t[param]         : ({0}, {1}, {2}, {3})'
//                     .format(args[0], args[1], args[2], args[3]))
//                 console.log('\t[param toint32] : ({0}, {1}, {2}, {3})'
//                     .format(args[0].toInt32(), args[1].toInt32(), 
//                             args[2].toInt32(), args[3].toInt32()))
//                 console.log('\n')
//             },
//             onLeave: function(retval) {
//                 console.log('===== [{0} onLeave] ====='.format(pointer))
//                 console.log('[Retval]:')
//                 console.log('\t[retval]         : ', retval)
//                 console.log('\t[retval toInt32] : ', retval.toInt32())
//                 console.log('\n--------------------------------------------------')
//             }
//         }
//     )
// })