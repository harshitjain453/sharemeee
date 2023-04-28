import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'

export const client=sanityClient({
    projectId :'55axgx7i',
    dataset:'production',
    apiVersion:"2023-03-24",
    useCdn:true,
    token:'skMEFWxOXBYYdXMSOH389N3bJWcWob5dt2vl8veJCqVDnQTHN01V07KoZOCZFs94qLo5SwnKhitqDkWZslFhDz0oK5igsvhRWDvos0yzMABR1glL8vR5d0VJsopXQCqiWBOsUCH0aFa4w7Vga4TgOwBO2lwFwkFpQMlpagSvoqKmC7KSI4Fz'
})

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);