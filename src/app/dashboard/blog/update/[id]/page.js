"use client"
import React, { useState ,useEffect  } from 'react';
import ImageUploading from 'react-images-uploading';

import Image from 'next/image';
import dashboardStyles from '../../../dashboard.module.css';
import {Box,Grid,TextField,Button,Typography} from '@mui/material';
import '../../../../globals.css';
import Sidebar from '../../../../../../components/Sidebar';
import Header from '../../../../../../components/Header';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {vehicleApi} from '../../../../../app/service/vehicle';
import {globalApi} from '../../../../../app/service/global';
import 'react-calendar/dist/Calendar.css';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation';


function Update({ params }) {  

  const router = useRouter()
  
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFulldesc] = useState("");
  const [status, setStatus] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaKeyword, setMetaKeyword] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [ThumbnailPhotos, setThumbnailPhotos] = useState();
  const [docId, setDocid] = useState();

  
  useEffect(() => {
    getBlogWithId();

  },[]); 

  const getBlogWithId = async () => {
    try {
      const data={id:params.id};
      setDocid(params.id);
      const response = await globalApi.getBlogWithId(data);
            // console.log(response.data.data);
      if (response.data.status === 200) {
        // setBrandlist(response.data.data);
        setTitle(response.data.data.title);
        setShortDesc(response.data.data.shortDesc);
        setFulldesc(response.data.data.fullDesc);
        setStatus(response.data.data.status);
        setMetaTitle(response.data.data.metaTitle);
        setMetaKeyword(response.data.data.metaKeyword);
        setMetaDesc(response.data.data.metaDesc);
        setThumbnailPhotos(response.data.data.imagePath);
      } 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
  const handleInput= async(e)=>{
    
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    }
    if (e.target.name === 'shortDesc') {
      setShortDesc(e.target.value);
    }
    if (e.target.name === 'status') {
      setStatus(e.target.value);
    }
    if (e.target.name === 'metaTitle') {
      setMetaTitle(e.target.value);
    }
    if (e.target.name === 'metaKeyword') {
      setMetaKeyword(e.target.value);
    }
    if (e.target.name === 'metaDesc') {
      setMetaDesc(e.target.value);
    }
    
    

    if (e.target.name === 'ThumbnailPhotos' && e.target.files.length > 0) {
      // console.log(e.target.files);
      
      // console.log(e.target.files[0].size);
      if(e.target.files[0].size<5000000)
      {
          // setThumbnailPhotos(e.target.files[0]);
          setIsLoader(true);
          uploadBlogImage(e.target.files[0]);
      }
      else
      {
          alert("Image size should be less than 5MB!")
      }
    }

  }

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ align: [] }],
      [{ color: [] }],
      ['code-block'],
      ['clean'],
    ],
  };


  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'align',
    'color',
    'code-block',
  ];

  const handleEditorChange = (newContent) => {
    setFulldesc(newContent);
  };

  const uploadBlogImage= async (data)=>{
    const formData = new FormData();
      formData.append('file', data);
    const response = await vehicleApi.uploadBlogImage(formData);
    if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
      // console.log(response);
      setIsLoader(false);
      // console.log(response.data.data);
      setThumbnailPhotos(response.data.data.path)
     
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const formData={docId,title,shortDesc,fullDesc,status,metaTitle,metaKeyword,metaDesc,ThumbnailPhotos};
    // console.log(formData);
    const response = await globalApi.updateBlog(formData);
    // console.log(response);
    if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
      confirm("Blog updated successfully");
      router.push("/dashboard/blog");
    }
  };
    

  return (
    <>
      <Box className={dashboardStyles.tm_dashboard_main}>        
        <Grid container> 
          <Sidebar/>         
          <Grid item md={10}>
            <Box className={dashboardStyles.tm_dashboard_rightbar_main}>
              <Header/>
              <Box className={dashboardStyles.tm_dashboard_rightbar_form_main}>
                <Box className={dashboardStyles.tm_dashboard_rightbar_form_title}>
                  <Typography variant='h3'>Update your blog!  </Typography>
                </Box>
                <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                  
                  <Grid item md={12}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Title" onChange={handleInput} name='title' type="text" value={title} variant="outlined" required fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={12}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Short Description" onChange={handleInput} name='shortDesc' type="text" value={shortDesc} variant="outlined" required fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={12}>
                    <Box>
                    <InputLabel id="demo-simple-select-label">Description*</InputLabel> 
                    <QuillEditor
                      name='fullDesc'
                      value={fullDesc}
                      onChange={handleEditorChange}
                      modules={quillModules}
                      formats={quillFormats}
                      className="w-full h-[70%] mt-10 bg-white"
                    />
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Status*</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Status"
                            onChange={handleInput}
                            name='status'
                            required
                          >
                            
                            <MenuItem value='ACTIVE'>Active</MenuItem>
                            <MenuItem value='INACTIVE'>Inactive</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                  </Grid>
                  
                  
                </Grid>
                <Box className={`${dashboardStyles.tm_dashboard_img_upl} ${"tm_dashboard_img_upl_gb"}`}>
                  {/* <Box className={dashboardStyles.tm_dashboard_img_upl_title}>
                    <Typography variant='h4'>Blog Image</Typography>
                  </Box> */}
                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Blog Image</Typography>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item md={3}> 
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_title} ${"tm_dashboard_img_upl_panel_title_gb"}`}>
                          <Button variant="contained" component="label">
                            Upload File
                            {/* <input type="file" onChange={handleInput} name='image' hidden /> */}
                            <input type="file" onChange={handleInput} name='ThumbnailPhotos' hidden />
                          </Button>
                        </Box>                        
                      </Grid>
                      <Grid item md={9}>
                              
                              <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box>
                                    {ThumbnailPhotos ? (<>
                                    <Image src={ThumbnailPhotos} width="200" height="100" alt='Image' controls />
                                    </>):(<> {isLoader?(<CircularProgress />):(<></>)}</>)}
                                    
                                </Box>
                              </Box>
                        </Grid>
                      </Grid>
                  </Box>
                </Box>

                <Box className={`${dashboardStyles.tm_dashboard_img_upl} ${"tm_dashboard_img_upl_gb"}`}>
                  <Box className={dashboardStyles.tm_dashboard_img_upl_title}>
                    <Typography variant='h4'>SEO Details</Typography>
                  </Box>
                  <Box>
                  <Grid container spacing={4}>
                  <Grid item md={12}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Meta Title" onChange={handleInput} name='metaTitle' type="text" value={metaTitle} variant="outlined" required fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={12}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Meta Keyword" onChange={handleInput} name='metaKeyword' type="text" value={metaKeyword} variant="outlined" required fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={12}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Meta Description" onChange={handleInput} name='metaDesc' type="text" value={metaDesc} variant="outlined" required fullWidth/>
                    </Box>
                  </Grid>
                  </Grid>
                  </Box>
                </Box>

                <Box sx={{margin:'50px 0 0'}}>
                  <Box className={dashboardStyles.tm_dashboard_rightbar_form_submit_btn}>
                    <Button variant="contained" type='submit'>submit</Button>           
                  </Box>
                </Box>
                </form>
              </Box>
            </Box>
          </Grid>
        </Grid>      
       
      </Box>
    </>
  )
}

export default Update