class VideosController < ApplicationController

  def create
    video = Video.new(upload_params)
    if video.valid?
      video.write_file(request)

      render json: {
        data: {
          attributes: {
            url: video.url
          }
        }
      }
    else
      render json: { errors: video.errors }, status: 422
    end
  end

  private

  def upload_params
    params.permit("file", "size")
  end

end
