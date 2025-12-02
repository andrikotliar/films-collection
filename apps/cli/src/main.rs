use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    let command = &args[2];

    println!("Current command: {}", command);
}
