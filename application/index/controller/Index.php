<?php
namespace app\index\controller;
use think\Controller;
use app\index\model\ShowImg;

class Index extends Controller
{
    public function index()
    {   
        $show_img = ShowImg::all()->toArray();
        $this->assign('json',json_encode($show_img));
        return $this->fetch('index', [
            'show_img' => $show_img
        ]);
    }
}
