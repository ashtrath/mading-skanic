import GithubIcon from "~/assets/icons/github-icon.svg";
import InstagramIcon from "~/assets/icons/instagram-icon.svg";
import TwitterIcon from "~/assets/icons/twitter-icon.svg";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between border-t border-t-mono-black bg-mono-white px-20 py-8">
      <dl id="copyright" className="flex gap-1 text-mono-black">
        <dt title="Copyright" className="font-bold">
          &copy;
        </dt>
        <dd className="font-bold">2024 Ashtrath.</dd>
        <p>All rights reserved.</p>
      </dl>
      <ul className="flex items-center gap-4 text-mono-black">
        <li>
          <a href="https://github.com/Dyzean/mading-skanic">
            <GithubIcon />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/mading.skanic">
            <TwitterIcon />
          </a>
        </li>
        <li>
          <a href="https://instagram.com/mading.skanic">
            <InstagramIcon />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
