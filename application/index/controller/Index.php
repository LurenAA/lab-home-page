<?php
namespace app\index\controller;
use think\Controller;
use app\index\model\ShowImg;
use app\index\model\News;

class Index extends Controller
{
    public function index()
    {   
        $show_img = ShowImg::all()->toArray();
        $show_news = array_slice(News::all()->toArray(),0, 3);
        return $this->fetch('index', [
            'show_img' => $show_img,
            'show_news' => $show_news
        ]);
    }
}
