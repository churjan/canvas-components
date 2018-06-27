        const SIZE=600;
        let base64Url='';

        //下载图片
        function downloadImg(){
            let ele = document.createElement('a');
            ele.setAttribute('href', base64Url);
            ele.setAttribute('download', 'hello.png');
            document.body.appendChild(ele);
            ele.click();
            document.body.removeChild(ele);
        }
        downloadBtn.onclick=downloadImg;
        // canvas图片合成
        function handleMergeImg(url) {
            let canvas = document.createElement('canvas');
            canvas.width = SIZE;
            canvas.height = SIZE;
            let context = canvas.getContext('2d');
            // 这是上传图像
            let img1 = new Image();
            let img2=new Image();
            let sum=0;
            let imgArr=[img1,img2];
            img1.crossOrigin='anonymous';
            img2.crossOrigin='anonymous';
            for(let i=0;i<imgArr.length;i++){
                imgArr[i].onload=function(){
                    sum++;
                    if(sum==2){
                        context.drawImage(img1, 0, 0, SIZE, SIZE);
                        context.drawImage(img2, 0, 0, 280, 170);
                        base64Url=canvas.toDataURL('image/png');
                        resultImg.src=base64Url;
                    }
                }
                
            }
            img1.src = url;
            img2.src = './sample.png';
        };



        chooseBtn.addEventListener('change', (e) => {
            let reader = new FileReader();
            let file = e.target.files[0];
            reader.onload = function (e) {
                let url = e.target.result;
                if (file.size > 1024 * 1024 * 5) {
                    alert('图片尺寸请小于5M');
                    return;
                }
                handleMergeImg(url)
                
            }
            reader.readAsDataURL(file);
        })