

const Footer = () => {
    return (
        <section className="w-full grid grid-cols-4 bg-secondary-light px-10 py-3">
            <div className="space-y-2">
                <h2 className="text-title font-semibold line-height-[40px]">About us</h2>
                <p className="text-muted-foreground">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae minus labore natus necessitatibus, numquam officiis quaerat, iusto tempora dolorem libero voluptatibus, nisi aspernatur blanditiis sed doloremque repellat nihil? Ad, voluptate.</p>
            </div>
            <div>
                <h2 className="text-title font-semibold text-sm">Customer Care</h2>
                <ul className="space-y-2">
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Track Order</a></li>
                    <li><a href="#">Return Order</a></li>
                    <li><a href="#">Cancel Order</a></li>
                </ul>
            </div>
            <div>
                <h2 className="text-title font-semibold text-sm">Company</h2>
                <ul className="space-y-2">
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                </ul>
            </div>
            <div>
                <h2 className="text-title font-semibold text-sm">Social Media</h2>
                <ul className="space-y-2">
                    <li><a href="#">Facebook</a></li>
                    <li><a href="#">Instagram</a></li>
                    <li><a href="#">Twitter</a></li>
                    <li><a href="#">LinkedIn</a></li>
                </ul>
            </div>
        </section>
    )
}


export default Footer