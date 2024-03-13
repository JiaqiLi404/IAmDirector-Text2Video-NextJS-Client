import React, { PropsWithChildren } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const FooterLink = (props: PropsWithChildren<{ href: string }>) => (
  <a href={props.href} className="font-semibold hover:text-gray-900">
    {props.children}
  </a>
);

export default function Footer() {
  return (
    <footer className="relative p-6 text-sm bg-gray-200">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap items-end">
          <div className="w-full px-4 text-base lg:w-6/12">
            <h4 id="contact-div" className="text-3xl font-semibold">联系我们</h4>
            <h5 className="text-lg mt-0 mb-2 text-gray-600">
              如果您有任何问题或意向合作，请随时<a
              href="mailto:li1962279338@gmail.com" style={{ color: '#0063d8' }}>联系我们</a>。
            </h5>
            <p className="mt-0 mb-2 text-gray-600 text-sm ">
              邮箱：<a href="mailto:li1962279338@gmail.com" className="hover:text-gray-900">li1962279338@gmail.com</a>
            </p>
            <p className="mt-0 mb-2 text-gray-600 text-sm">
              github：<a href="https://github.com/JiaqiLi404" className="hover:text-gray-900">https://github.com/JiaqiLi404</a>
            </p>
          </div>
          <div className="flex flex-wrap w-full px-4 lg:w-6/12 lg:text-left">
            {/*<div className="w-full px-4 mt-3 lg:w-5/12">*/}
            {/*  <span className="block mb-1 text-sm font-semibold uppercase opacity-75">*/}
            {/*    Useful Links*/}
            {/*  </span>*/}
            {/*  <ul className="list-unstyled">*/}
            {/*    <li>*/}
            {/*      <FooterLink href="https://www.netlify.com/jamstack/">*/}
            {/*        About the JAMstack*/}
            {/*      </FooterLink>*/}
            {/*    </li>*/}
            {/*    <li>*/}
            {/*      <FooterLink href="https://nuxtjs-template.netlify.app/">*/}
            {/*        Nuxt.js Template*/}
            {/*      </FooterLink>*/}
            {/*    </li>*/}
            {/*  </ul>*/}
            {/*</div>*/}
            <div className="w-full px-28 mt-6 lg:w-10/12">
              <span className="block mb-1 text-sm font-semibold uppercase text-gray-800">
                技术支持
              </span>
              <ul className="list-unstyled text-gray-500" >
                <li>
                  <FooterLink href="https://fliki.ai/?via=iamdirector">
                    Fliki
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="https://openai.com/">
                    OpenAI
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="https://cloud.baidu.com/product/wenxinworkshop">
                    百度千帆大模型
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="https://open.bigmodel.cn/">
                    智谱AI
                  </FooterLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="mt-3 mb-6 border-gray-400" />
        <div className="w-full mx-auto">
          <p className="py-1 text-sm text-center text-gray-600">
            <a  href="https://beian.miit.gov.cn/"
                className="hover:text-gray-900"
               target="_blank">浙ICP备19025185号-3</a>
          </p>
          <p className="py-1 text-sm text-center text-gray-600">
            Copyright © {new Date().getFullYear()} IAmDirector by{' '}
            <a
              href="https://github.com/JiaqiLi404"
              className="hover:text-gray-900"
            >
              JiaqiLi404
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
    ;
}
