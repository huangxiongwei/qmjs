var tempFilePaths = [];
var fileNamePaths;
var backlist = [];
function selectImg(backfun,tempFile,fileName,num=1){
    fileNamePaths= fileName;
    if(fileName){
        tempFilePaths = tempFile;
    }else{
        wx.chooseImage({
        count: num,
        success: function(res) {
            tempFilePaths = res.tempFilePaths;
        }
        })
    }
    upload(backfun,num);
  }

  /**
 * 上传方法
 * filePath: 上传的文件路径
 * fileName： 上传到cos后的文件名
 */
function upload(backfun,num=1) {
    var filePath = tempFilePaths.pop();
    // 获取文件名
    var fileName = filePath.match(/(wxfile:\/\/)(.+)/);
    if(!fileNamePaths){
        fileName = fileName[2]; 
    }
    else{
        fileName = fileNamePaths.pop();
    }
    wx.request({
        url: "https://61652509.aimei1314.com/cosphp/auth.php?bucket=picupload&filepath=testfolder",
        success: function(cosRes) {
            var cosUrl = "https://gz.file.myqcloud.com/files/v2/1252824453/picupload/testfolder";
            wx.uploadFile({
                url: cosUrl + '/' + fileName,
                filePath: filePath,
                header: { 'Authorization': cosRes.data },
                name: 'filecontent',
                formData: { op: 'upload', insertOnly:1},
                success: function(uploadRes){ 
                     var result = JSON.parse(uploadRes.data);
                     backlist.push(result.data.source_url);
                     if(tempFilePaths && tempFilePaths.length > 0){
                         upload(backfun,num);
                     }
                     else{
                        typeof backfun == "function" && backfun(backlist)
                     }
                },
                fail:function(uploadRes){
                    console.log("上传cos失败:" + uploadRes);
                }
            })
        }
    })
}

module.exports = {
  selectImg: selectImg
}