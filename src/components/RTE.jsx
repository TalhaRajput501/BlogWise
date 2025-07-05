import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import config from '../config/config.js'



function RTE({ articleBody, control, defaultValue = 'Type something...', label}) {
  return (
    <div className='w-full '>

        {label && <label className='text-green-800 font-bold'>{label}</label>}

        <Controller
        name={articleBody || 'articleBody'}
        control={control}
        defaultValue={defaultValue}
        render={({field}) => (
            <Editor 
            apiKey={config.tinyMceKey} 
            value={field.value} 
            onEditorChange={field.onChange} 
            init={{ 
                height: 620,
                menubar: true,
                plugins: [
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media", 
                    "code",
                    "help",
                    "wordcount",
                    "anchor",
                ], 
                toolbar:
                'undo redo | blocks fontfamily fontsize | bold italic underline forecolor | showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                // Define default configuration/editing  of content
                content_style: "body { font-family:Comic Sans MS,Arial,sans-serif; font-size:18px }"
            }}
            />
          
        )}
        
        />

    </div>
  )
}

export default RTE
